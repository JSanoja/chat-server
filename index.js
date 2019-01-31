
// Abrir la lista blanca de dominios
const fs = require('fs');
var whiteList = JSON.parse(fs.readFileSync('white-list.json', 'utf8'));
whiteList = whiteList.domain;

// importar librerias del socket y configuracion del servidor
const server = require('http').createServer();
const io = require('socket.io')(server);
io.attach(server, {
  pingInterval: 60000,
  pingTimeout: 5000,
  cookie: false
});

// intermedio para validar dominios
io.use((socket, next) => {    
  let clientURL = socket.handshake.headers.origin;    
  if (whiteList.indexOf(clientURL)>-1) {
    console.log('Coneccion del dominio permitido '+clientURL,'de', socket.handshake.query.user)    
    return next(); 
  } else {
    console.log('Coneccion rechazada del dominio '+clientURL)
  }           
});
// Luego de aceptar el dominio conecto
  io.of('/161').on('connection', socket => {
    // console.log(socket)
    // Usuario conectado
    let room = socket.handshake.query.idCMSPortal;    
    socket.join(room);  
    let key = socket.id;
    let user= socket.handshake.query.user;
    console.log(user + ' Se unio al Room '+ room);
    console.log(socket.nsp.name)
    io.of('/161').to(room).emit('CONECT', socket.handshake.query); 
    // Acciones para el usuario desconectado
    socket.on('disconnect', () =>{    
      // let key = socket.id;
      // let user= socket.handshake.query.user;
      // let room= socket.handshake.query.idCMSPortal;
      console.log(user + ' Salio del Room ', room);
      io.to(room).emit('DISCONECT', socket.handshake.query);        
    });

    // emitir al room el evento 
    socket.on('EMIT', (data) => {    
      console.log(data)
      io.of('/161').to(data.event).emit(data.event, data.data);        
    });

    socket.on('GETUSERS', (data, fn) => {        
      // fn(test);
      io.of('/161').clients((error, clients) => {
        if (error) throw error;
        let clientsArray = []
        clients.forEach(client => {
          clientsArray.push(io.of('/161').connected[client].handshake.query);
        })        
        fn({
          clients: clientsArray
        })
      });
    })
    socket.on('PING', (data, fn) => {
      console.log('PING')
      io.of('/161').clients((error, clients) => {
        if (error) throw error;       
        clients.forEach(client => {                
          const clientQuery = io.of('/161').connected[client].handshake.query;        
          const isClient = clientQuery.idCMSUsuario.indexOf(data.to);                  
          if (isClient != -1) {          
            // console.log(io.in(data.room).connected[client])
            // console.log(data.to, clientQuery.idCMSUsuario, isClient, client)                      
            io.of('/161').to(client).emit('PING', {data: "Pin enviado por " + data.from + " para " + data.to}); 
          }
        })
      });
    })
    socket.on('CHAT', (data, fn) => {
      console.log('CHAT')
      io.of('/161').clients((error, clients) => {
        if (error) throw error;       
        clients.forEach(client => {                
          const clientQuery = io.of('/161').connected[client].handshake.query;        
          const isClient = clientQuery.idCMSUsuario.indexOf(data.to);                  
          if (isClient != -1) {
            // console.log(data, clientQuery.idCMSUsuario, isClient, client)                      
            io.of('/161').to(client).emit('CHAT', {
              to: data.to,
              from: data.from,
              message: data.message
            }); 
          }
        })
      });
    })
    // Se unio al room
    socket.on('SUB', sub => {   
        socket.join(sub.event);
        console.log();
        console.log('El cliente de id '+ socket.id + ' se unio al room '+ sub.event)
    });

    // Se salio del room
    socket.on('UNSUB', sub => { 
        socket.leave(sub.event);
        console.log();
        console.log('El cliente de id '+ socket.id + ' se desunio al room '+ sub.event)    
    });

  })

 
// se levanta el servidor
server.listen(3000, function(){
  console.log('listening on *:3000');
});

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
    console.log('Coneccion del dominio permitido '+clientURL)
    return next(); 
  } else {
    console.log('Coneccion rechazada del dominio '+clientURL)
  }         
});

// Luego de aceptar el dominio conecto
io.on('connection', socket => {
  // Usiario conectado
  let socketEvents = socket.handshake.query.sub ? socket.handshake.query.sub.split(',') : [];

  // Unirse a los room que el usuario tiene suscrito por default
  socketEvents.forEach(socketEvent=> {
    socket.join(socketEvent);
    console.log();
    console.log(socket.id + ' Se unio al Room '+ socketEvent);
  });

  // acciones para el usuario desconectado
  socket.on('disconnect', () =>{
    console.log();
    console.log(socket.id + ' se desconecto y salio de los room');  
  });

  // emitir al room el evento 
  socket.on('EMIT', (data) => {    
    io.to(data.event).emit(data.event, data.data);        
  });

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
});
 
// se levanta el servidor
server.listen(3000, function(){
  console.log('listening on *:3000');
});
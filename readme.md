# Event Manager

Mensajeria entre aplicaciones con node.js y Socket.io

## Getting Started

```
1. npm install
2. node index.js
```

## Client Side

``` javascript

socket = io('http://localhost:3000',{
      query: {
        usuario: 'Juan Sanoja',
        desde: 'Emisor de Eventos',
        sub : ['Evento A']
      }
    });

this.socket.emit('EMIT', {event: 'Evento A',data:'Evento A'}, (data) => {
      
    })
```


### Prerequisites

Node y NPM

## Versioning
    @1.0 Rooms & Events

## Authors

 JSanoja y GPela para Dos al cubo


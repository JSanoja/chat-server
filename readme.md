# Event Manager

Mensajeria entre aplicaciones con node.js y Socket.io

## Getting Started

```
1. npm install
2. node index.js
```

## Client Side

``` javascript

socket = io('URL_NODE',{
      query: {
        sub : ['NOMBRE EVENTO'}
    });

this.socket.emit('EMIT', {event: 'NOMBRE EVENTO',data:{}})

this.socket.emit('SUB', {event:"NOMBRE EVENTO"});
this.socket.emit('UNSUB', {event:"NOMBRE EVENTO"});

```


### Prerequisites

Node y NPM

## Versioning
    @1.0 Rooms & Events

## Authors

 JSanoja para Dos al cubo


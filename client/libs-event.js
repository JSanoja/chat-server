class TdEvent {
    constructor(socket, tdChat) { 
        this.closeIcon = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" class="svg-inline--fa fa-times fa-w-11 fa-3x"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" class=""></path></svg>`;
        this.sendIcon = `<svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="telegram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="svg-inline--fa fa-telegram fa-w-16 fa-3x"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z" class=""></path></svg>`;
    }
    
    init(domainServer, tdChatConst) {        
        this.tdChat = tdChatConst;
        this.buildMain()
        console.log()
        this.config(domainServer+this.tdChat.idCMSPortal, this.tdChat);
        this.addStyles(this.tdChat);
        this.showUser(this.tdChat);
        this.getUsers(this.tdChat).then(users => {
            this.buildUsers(users)
            this.subscribeConect();
            this.subscribeDisconect();
            this.subscribePing();
            this.subscribeChat();
        });

    }
    buildMain() {
        jQuery('body').append(`
            <div id="${this.tdChat.divUser}"></div>
            <div id="${this.tdChat.divChat}"></div>
        `)
    }
    config(domain, object) {
        console.log(domain)
        this.socket = io(domain, {
            query: object
        })
    }
    onEvent(event, func) {
        this.socket.on(event, data => { func(data) });
    }
    emitSub(event) {
        this.socket.emit('SUB', { event: event });
    }
    emitUnsub(event) {
        this.socket.emit('UNSUB', { event: event });
    }
    emitEvent(data) {
        this.socket.emit('EMIT', { event: event, data: data })
    }
    emitPing(from, to) {
        this.socket.emit('PING', { from: from, to: to, nameSpace: this.tdChat.idCMSPortal })
    }
    emitChat(from, to, message) {
        this.socket.emit('CHAT', {   
            from: from,         
            to: to, 
            nameSpace: this.tdChat.idCMSPortal,
            message: message
        })
    }
    addStyles(data) {
        jQuery.getScript("tdchat.css.js")
            .done(function (script, textStatus) {
                eval(script);
                jQuery('body').append(tdChatCss(data))
            });
    }
    getUsers(data) {
        return new Promise((resolve, reject) => {
            this.socket.emit('GETUSERS', {
                room: data.idCMSPortal
            },
                (data) => resolve(data.clients)
            );
        })
    }
    clickUser (from, to, user) {
        this.emitPing(from,to);
        console.log(from, to, user);
        this.buildChat(from, to, user);
    }
    buildUsers(data) {
        data.forEach((client, index) => {
            if (index === 0) {
                jQuery(`#${client.divUser}`).empty();
            }
            this.buildUser(client)
        });
    }
    buildUser(client) {
        if (jQuery(`#user-${client.idCMSUsuario}`).length === 0) {
            jQuery(`#${client.divUser}`).append(`
                <figure id="user-${client.idCMSUsuario}" data-idusuario="${client.idCMSUsuario}" style="background-image:url(${client.userPicture}); border-color:${this.getRandomColor()}">
                    <figcaption class="user-caption">${client.user}</figcaption>
                </figure>
            `);
            jQuery(`#user-${client.idCMSUsuario}`).click(()=> {
                this.clickUser(this.tdChat.idCMSUsuario, client.idCMSUsuario, client.user);
            })
            console.log('Se construyo', client.user)
        }
    }
    buildChat(from, to, user) {
        
        if (jQuery(`#td-chat-${to}`).length == 0) {
            console.log(jQuery(`#td-chat-${to}`).length)
            jQuery(`#${this.tdChat.divChat}`).append(`
                <div class="td-chat-to" id="td-chat-${to}" data-to="${to}">
                    <div class="td-chat-header">
                        <div class="td-chat-close">${this.closeIcon}</div>
                        <h2>${user}</h2>
                    </div>
                    <div class="td-chat-area"></div>
                    <input class="td-chat-input" type="text" placeholder="Escribir" value=""/>
                    <a class="td-chat-send">${this.sendIcon}</a>                    
                </div>
            `);
            jQuery(`#td-chat-${to} .td-chat-send`).click(()=> {
                let message = jQuery(`#td-chat-${to} .td-chat-input`).val();
                this.emitChat(from, to, message);
                jQuery(`#td-chat-${to} .td-chat-input`);
            })
            jQuery(`#td-chat-${to} .td-chat-close`).click(()=> {
                jQuery(`#td-chat-${to}`).remove()
            })
        }
    }
    showUser(client) {
        jQuery('body').prepend(client.user)
    }
    removeUser(client) {
        if (jQuery(`#user-${client.idCMSUsuario}`).length != 0) {
            jQuery(`#${client.divUser}`).children(`#user-${client.idCMSUsuario}`).remove();
            console.log('Se destruyo', client.user)
        }
    }
    subscribeDisconect() {
        this.onEvent('DISCONECT', (clientOff) => {
            console.log('Desconecto ', clientOff.user)
            this.getUsers(clientOff).then(users => {
                const pos = users.map((e) => e.idCMSUsuario).indexOf(clientOff.idCMSUsuario);
                if (pos === -1) this.removeUser(clientOff)
            })
        })
    }
    subscribeConect() {
        this.onEvent('CONECT', (data) => {
            this.buildUser(data);
            console.log('conecto ', data.user)
        })
    }    
    subscribePing() {
        this.onEvent('PING', (data) => {            
            console.log('PING => ', data)
        })
    }
    subscribeChat() {
        this.onEvent('CHAT', (data) => {            
            console.log(data)
        })
    }
    getRandomColor() {
        const random = Math.floor(Math.random() * 10);
        switch (random) {
            case 0:
                return '#f44336'
            case 1:
                return '#e91e63'
            case 2:
                return '#9c27b0'
            case 3:
                return '#673ab7'
            case 4:
                return '#3f51b5'
            case 5:
                return '#2196f3'
            case 6:
                return '#ff5722'
            case 7:
                return '#00bcd4'
            case 8:
                return '#009688'
            case 9:
                return '#1b5e20'
            case 10:
                return '#cddc39'
        }
        return color;
    }
}
const tdEvent = new TdEvent();
document.addEventListener('DOMContentLoaded', function () {
    tdEvent.init('http://localhost:3000/', tdChat);
})






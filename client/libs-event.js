
class TdEvent {
    constructor(socket, tdChat) { }
    init(domainServer, tdChatConst) {
        this.tdChat = tdChatConst;
        this.config(domainServer, this.tdChat);
        this.addStyles(this.tdChat);
        this.getUsers(this.tdChat).then(users => {
            this.buildUsers(users)
            this.subscribeConect();
            this.subscribeDisconect();
            this.subscribePing();
        });

    }
    config(domain, object) {
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
        this.socket.emit('PING', { from: from, to: to, room: this.tdChat.idCMSPortal })
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
    clickUser (from, to) {
        this.emitPing(from,to);
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
                this.clickUser(this.tdChat.idCMSUsuario, client.idCMSUsuario);
            })
            console.log('Se construyo', client.user)
        }
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






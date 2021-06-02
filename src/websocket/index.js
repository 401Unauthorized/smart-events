const WebSocketClient = require('websocket').client;
const { Decoder } = require('socket.io-parser');
const querystring = require('querystring');

class SocketService {
    constructor(config) {
        this.config = config;
        this.client = new WebSocketClient();
        this.decoder = new Decoder();
    }

    connect(csrfToken, cookie) {
        const searchParams = querystring.stringify({
            ...this.config.websocket.query,
            csrfToken
        });

        this.client.connect(this.config.websocket.uri + '?' + searchParams, 'echo-protocol', this.config.websocket.origin, {
            ...this.config.websocket.headers,
            'Cookie': cookie
        });
    }

    handleEvents(emitter) {
        this.decoder.on('decoded',  decodedPacket => {
            emitter.emit('connection::decoded', decodedPacket);
        });

        this.client.on('connectFailed',  error => {
            emitter.emit('connection::error', error);
        });

        this.client.on('connect', connection => {
            emitter.emit('connection::connected');

            // Request authentication
            setTimeout(() => {
                connection.sendUTF('420["authenticate",{}]')
            }, 1000);

            // Keep Connection Alive
            setInterval(() => {
                connection.sendUTF('2');
            }, 10000)

            connection.on('error', error => {
                emitter.emit('connection::error', error);
            });

            connection.on('close', () => {
                emitter.emit('connection::closed');
            });

            connection.on('message', message => {
                if (message.type === 'utf8') {
                    this.decoder.add(message.utf8Data);
                }
            });

            this.client.on('send', str => {
                connection.sendUTF(str);
            });

        });
    }

    send(str) {
        this.client.emit('send', str);
    }

}

module.exports = SocketService;

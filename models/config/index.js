const { name, version, repository } = require('../../package.json');

module.exports = {
    websocket: {
        uri: 'wss://my.smartthings.com/socket.io/',
        origin: 'https://my.smartthings.com',
        query: {
            EIO: 3,
            transport: 'websocket'
        },
        headers: {
            Origin: 'https://my.smartthings.com',
            Host: 'my.smartthings.com',
            'Upgrade': 'websocket',
            'Connection': 'Upgrade',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
            'Sec-WebSocket-Version': '13',
            'User-Agent': `${name}/${version} (${repository.url.split('.git')[0]})`
        }
    }
}
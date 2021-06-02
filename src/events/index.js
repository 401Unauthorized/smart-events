const SocketService = require('../websocket');
const { defaultConf, memstore } = require('../../models');
const EventEmitter = require('events');
const validator = require('./validator');

class EventService extends EventEmitter {
    constructor(config) {
        super();
        this.socket = new SocketService(config || defaultConf);
        this.internalEmitter = new EventEmitter.EventEmitter();
    }

    connect(csrfToken, cookie) {
        this.socket.connect(csrfToken, cookie);
        this.socket.handleEvents(this.internalEmitter);
        this.handleEvents();
    }

    handleEvents() {
        this.internalEmitter.on('connection::decoded', this.parseEvent.bind(this));
        this.internalEmitter.on('connection::closed', () => this.emit('disconnected'));
        this.internalEmitter.on('connection::error', err => this.emit('error', err));
    }

    parseEvent(evt) {
        for (const [key, validate] of Object.entries(validator)) {
            if (validate(evt)) {
                return this.emitEvent(key, evt);
            }
        }
        return this.emitEvent('unknown', evt);
    }

    emitEvent(key, evt) {
        switch (key) {
            case 'hello':
                break;

            case 'pong':
                break;

            case 'connect':
                setTimeout(() => {
                    this.emit('connected', evt.data);
                }, 3000);
                break;

            case 'authentication':
                this.emit('authenticated', evt.data[1]);
                break;

            case 'user':
                this.emit('user', evt.data[1]);
                this.storeUsers([evt.data[1]])
                break;

            case 'location':
                this.emit('location', evt.data[1]);
                break;

            case 'state':
                this.emit('state', evt.data[1])
                break;

            case 'control':
                this.emit('control', evt.data[1])
                break;

            case 'locations':
                this.emit('locations', evt.data[1]);
                this.storeLocations(evt.data[1])
                break;

            case 'rooms':
                this.emit('rooms', evt.data[1]);
                this.storeRooms(evt.data[1])
                break;

            case 'devices':
                const d = this.extractDeviceInfo(evt.data[1].data);
                this.storeDevices(d);
                this.emit('devices', d);
                break;

            case 'event':
                const res = {
                    event: evt.data[1],
                    device: this.getDevice(evt.data[1].data.deviceId)
                }
                this.emit('event', res)
                this.emit(`event::${evt.data[1].data.deviceId}`, res)
                break;

            case 'alert':
                this.emit('alert', evt.data);
                break;

            case 'error':
                this.emit('error', evt.data[0])
                break;

            case 'unknown':
                this.emit('unknown', evt);
                break;

            default:
                console.log('Unhandled Event Type', key);
        }
    }

    extractDeviceInfo(devices) {
        return devices.map(d => d.basic);
    }

    storeDevices(devices) {
        devices.forEach(d => memstore.devices.set(d.deviceId, d));
    }

    getDevice(deviceId) {
        return memstore.devices.get(deviceId);
    }

    storeLocations(locations) {
        locations.forEach(l => memstore.locations.set(l.locationId, l));
    }

    getLocation(locationId) {
        return memstore.locations.get(locationId);
    }

    storeRooms(rooms) {
        rooms.forEach(r => memstore.rooms.set(r.roomId, r));
    }

    getRoom(roomId) {
        return memstore.rooms.get(roomId);
    }

    storeUsers(users) {
        users.forEach(u => memstore.users.set(u.principal, u));
    }

    getUser(principal) {
        return memstore.users.get(principal);
    }

    subscribe(locationId) {
        this.socket.send(`4212["create","api/subscription",{"locationId":"${locationId}"},{}]`)
    }

    fetchLocations() {
        this.socket.send('421["find","api/location",{}]');
    }

    fetchRooms(locationId) {
        this.socket.send(`428["find","api/room",{"locationId":"${locationId}"}]`);
    }

    fetchDevices(locationId) {
        this.socket.send(`426["find","api/device",{"locationId":"${locationId}","since":null,"version":null,"locale":{"language":"en"}}]`);
    }

    fetchUser() {
        this.socket.send('422["get","api/user",null,{}]');
    }

}

module.exports = EventService;

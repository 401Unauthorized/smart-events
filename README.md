<div align="center">
  <h3></h3>  
  <img alt="Smart Events" src="./resources/logo.png" />
  <h3>An unofficial SmartThings websocket API library (alpha)</h3>
</div>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.1-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-%3E%3D10.23.0-blue.svg" />
  <a href="https://github.com/401unauthorized/smart-events#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/401unauthorized/smart-events/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/401unauthorized/smart-events/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/401unauthorized/smart-events" />
  </a>
  <a href="https://twitter.com/stephenmendez_" target="_blank">
    <img alt="Twitter: stephenmendez_" src="https://img.shields.io/twitter/follow/stephenmendez_.svg?style=social" />
  </a>
  <a href="https://paypal.me/stephenmendez401" target="_blank">
    <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" alt="PayPal" />
  </a>
</p>

## 💾 Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

`$ npm i -S smart-events`

## 🔌 Quick Start

```javascript
const EventService = require('smart-events');

const st = new EventService();

// Initiate Connection
st.connect('<csrfToken>', '<cookie>');

// Connected via Websocket
st.on('connected', data => {
    console.log('Connected!', data);
    st.fetchUser(); // Fetch User Info
    st.fetchLocations(); // Fetch Hub Locations
    st.fetchRooms('<locationId>'); // Fetch Rooms @ Location
    st.fetchDevices('<locationId>'); // Fetch All Devices @ Location
    st.subscribe('<locationId>'); // Subscribe to Device Events @ Location
});

// Authenticated
st.on('authenticated', data => {
    console.log('Authenticated:', data)
});

// User Info
st.on('user', data => {
    console.log('User:', data);
});

// Hub Locations
st.on('locations', data => {
    console.log('Locations:', data);
});

// Rooms
st.on('rooms', data => {
    console.log('Rooms:', data);
});

// Devices
st.on('devices', data => {
    console.log('Devices:', data);
});

// Device Events
st.on('event', data => {
    console.log('Device Event:', data);
});

// Unknown message received
st.on('unknown', evt => {
    console.log('Unknown Event', evt);
});

// An API error occured
st.on('error', err => {
    console.log('An Error:', err);
});

```

## 🔮 Features

- Asynchronous event driven API
- Does not require long/short polling, webhook endpoints or a SmartApp
- Detailed location, room, device and event information
- Built in data validation (limited)
- Easy integration into other projects (custom dashboards, automations, monitoring, logging, etc)

## 👓 Transparency

- This is an early stage, alpha level project and may be unstable for some time
> If you would like an official library, reach out to SmartThings / Samsung, mention this project & express your interest!
- Should not be considered 'production ready' or used in critical implementations
- Subject to unpredictable changes which can break this implementation without notice
- Some [security concerns & known vulnerabilities](https://github.com/401unauthorized/smart-events/blob/master/SECURITY.md) may exist and should be reviewed prior to using the package
- Needs a refactor to align to best practices and OOP principles


## 🛠 Setup & Getting Started

### Authentication

> The current authentication approach has some [security concerns](https://github.com/401unauthorized/smart-events/blob/master/SECURITY.md) which should be reviewed and acknowledged.

> If anyone from SmartThings / Samsung reads this, please consider adding additional authentication schemes (OAuth, bearer token, etc) for better safety & usability.

The current implementation relies on a `csrfToken` & session `cookie` from the SmartThings Web App.

In order to get that information, the following steps must be performed in Google Chrome:

1. Open the web browser and navigate to https://my.smartthings.com
2. Enter your Samsung credentials to log into the web app
3. Select the main location for which you plan on subscribing to events (it may be possible to monitor multiple locations but it has not been tested or documented)
4. Open the `Settings` menu and enable `Keep me signed in`
> Note, there is currently a bug in the UI which makes it appear as if the setting did not work (even though it did). You can confirm this worked later on via the `authenticated` event's output.
5. Open the `Developer Tools` menu in Chrome and navigate to the `Network` tab
6. Enable `Preserve Log`, select the `WS` filter and refresh the page
7. Open the `Console` tab and copy/paste the following script to copy a JS object to your clipboard
```javascript
copy({ 
  cookie: '',
  csrfToken: window._app.csrfToken,
  locationId: window.location.pathname.split('/')[2]
});
```
8. Store the values somewhere secure & accessible by your code (see [env.js](#envjs-optional) or [.env](#env-optional) sections for general ideas)
9. Open the `Network` tab, select the websocket request and under `Headers` right click the cookie and select `Copy value`
10. Paste the value of the `cookie` somewhere secure & accessible by your code


#### env.js (optional)

This file may be created to store persistant environmental variables.

This file must be added `.gitignore` & never published. See [security concerns](https://github.com/401unauthorized/smart-events/blob/master/SECURITY.md) for more details.

Example of storing information in this file:

```javascript
module.exports = { 
  cookie: 'abc123',
  csrfToken: 'abc123',
  locationId: 'abc123'
}
```

Example of getting information from this file:

```javascript
const {csrfToken, cookie, locationId} = require('./env.js');
console.log(csrfToken, cookie, locationId);
```

#### .env (optional)

This is a commonly used way to store persistant environmental variables.

In your code, you can use the [dotenv](https://www.npmjs.com/package/dotenv) package to access the stored values at runtime.

This file must be added `.gitignore` & never published. See [security concerns](https://github.com/401unauthorized/smart-events/blob/master/SECURITY.md) for more details.

Example of storing information in this file:

```BASH
CSRFTOKEN=abc123
COOKIE=abc123
LOCATIONID=abc123
```

Example of getting information from this file:

```javascript
require('dotenv').config()
console.log(process.env.CSRFTOKEN, process.env.COOKIE, process.env.LOCATIONID);
```

## 💡 Methods

### `connect(csrfToken, cookie)`

- Initiates the websocket connection
- csrfToken: string
- cookie: string
- Emits the `connected` event

### `fetchUser()`

- Requests information about the user
- Emits the `user` event

### `fetchLocations()`

- Requests the list of locations available to the user
- Emits the `locations` event

### `fetchRooms(locationId)`

- Requests the list of rooms at the specified location
- locationId: string
- Emits the `rooms` event

### `fetchDevices(locationId)`

- Requests the list of devices at the specified location
- locationId: string
- Emits the `devices` event

### `subscribe(locationId)`

- Subscribes to receive all device events at the location
- It may be possible to subscribe to events from multiple locations but it has not been tested or documented
- locationId: string
- Emits the `event` event for all device updates

### `getUser(principal)`

- Retrieves the user object for the specified user from memory
- principal: string

### `getLocation(locationId)`

- Retrieves the location object for the specified location from memory
- locationId: string

### `getRoom(roomId)`

- Retrieves the room object for the specified room from memory
- roomId: string

### `getDevice(deviceId)`

- Retrieves the device object for the specified device from memory
- deviceId: string

## 🌐 Events 

### `connected`

- The websocket connection has been opened
```javascript
{
  sid: '<uuid>',
  upgrades: [],
  pingInterval: 25000,
  pingTimeout: 5000
}
```

### `authenticated`

- The server has authenticated the websocket connection

```javascript
{
  userId: '<uuid>',
  sessionLength: 28800,
  stayLoggedIn: true // Can be used to confirm the "Authentication" step in the docs was performed correctly
}
```

### `user`

- Provides information about the user which is authenticated
- Reminder, this information is likely sensitive and should not be shared

```javascript
{
  principal: 'user_uuid:<uuid>',
  samsung_account_id: '<id>',
  countryCode: 'USA',
  user_name: 'user_uuid:<uuid>',
  scope: [ 'mobile' ],
  fullName: '<name>',
  access_tier: 0,
  exp: 1623210310, // Unix Timestamp
  uuid: '<uuid>',
  email: '<email>',
  authorities: [ 'ROLE_DEVELOPER', 'ROLE_USER' ],
  client_id: '<uuid>',
  impersonation: false, // Anyone know what this means?
  permissions: [
    'installedapp.read',
    'installedapp.edit',
    'scene.read',
    'scene.edit',
    'location.read',
    'location.edit',
    'event.read',
    'global.read',
    'global.edit',
    'error.read'
  ],
  featureFlags: {
    'cake.camera': true,
    'cake.customAuth': true,
    'cake.deviceRoomAssignment': true,
    'cake.feedbackLink': { hidden: true },
    'cake.languagePicker': false,
    'cake.cookiepolicy': true,
    'cake.debugview': false,
    'cake.nativeLogLevel': 'info'
  },
  session: { stayLoggedIn: true, sessionLength: 28800 }
}
```

### `location`

- To Be Determined

### `locations`

- Provides a list of locations attached to this account

```javascript
[{
    locationId: '<uuid>',
    name: '<location name>',
    parent: { type: 'ACCOUNT', id: '<locationId of parent account>' }
  },
  ...
]
```

### `rooms`

- Provides a list of rooms at the location

```javascript
[{
  roomId: '<uuid>',
  locationId: '<uuid>',
  name: '<room name>',
  backgroundImage: null,
  created: 1602298686032,
  lastModified: 1602298686032
},
  ...
]
```

### `devices`

- A list of all devices at the location
- The full extent of possible values is unknown but there is a lot of data about each device
- Some fields/values may be omitted in the following object for brevity

```javascript
[
{
  locationId: '<uuid>',
  icon: 'https://client.smartthings.com/icons/oneui/x.com.st.d.sensor.multifunction',
  inactiveIcon: 'https://client.smartthings.com/icons/oneui/x.com.st.d.sensor.multifunction/off',
  plugin: { uri: 'wwst://com.samsung.one.plugin.stplugin' },
  lottieData: {
    icon: 'https://client-assets.smartthings.com/lottie/ic_device_multipurpose_sensor_1.json',
    scenes: []
  },
  deviceId: '<uuid>',
  roomId: '<uuid>',
  componentId: 'main',
  deviceName: '<Device Name>',
  deviceTypeData: { type: 'NONE' },
  states: [
    {
      capabilityId: 'contactSensor',
      attributeName: 'contact',
      componentId: 'main',
      value: 'open',
      label: 'Open',
      active: true,
      type: 'activated',
      icon: 'https://client.smartthings.com/icons/oneui/x.com.st.d.sensor.multifunction/on',
      arguments: []
    },
    {
      capabilityId: 'contactSensor',
      attributeName: 'contact',
      componentId: 'main',
      value: 'closed',
      label: 'Closed',
      active: false,
      type: 'inactivated',
      icon: 'https://client.smartthings.com/icons/oneui/x.com.st.d.sensor.multifunction/off',
      arguments: []
    },
    {
      capabilityId: '*',
      attributeName: '*',
      componentId: '*',
      value: '*',
      label: 'Connected',
      active: true,
      type: 'activated',
      icon: 'https://client.smartthings.com/icons/oneui/x.com.st.d.sensor.multifunction/on',
      arguments: []
    }
  ],
  actions: []
},
...
]
```

### `event`

- This is called when any device at the location issues an update
- The `stateChange` field is used to determine if this is a new value or just a generic update/ping
- This event handler is called many times so be mindful about how it is used
- Some events for the same device will be fired in close succession based on similar attributes
- The `device` object will only be populated if `.getDevices('<locationId>')` was previously called
    - This should be done if the device name is needed as it is not provided by the event itself

```javascript
{
  event: {
    data: {
      eventType: 'DEVICE_EVENT',
      eventId: '<uuid>',
      locationId: '<uuid>',
      deviceId: '<uuid>',
      componentId: 'main',
      capability: 'powerMeter',
      attribute: 'power',
      value: 9.2, // Many devices will use a string value, such as 'on' for switches
      valueType: 'number', // Other types are possible
      unit: 'W',
      stateChange: true,
      time: '2021-06-09T04:16:03.854Z'
    },
    subscriptionId: '<long-uuid>'
  },
  device: {} // Same structure as previously defined
```

### `event::<deviceId>`

- Can be used to handle events generated from a specific device rather than all events
- Provides the same object as the `event` handler

### `alert`

- To Be Determined

### `state`

- To Be Determined

### `control`

- To Be Determined

### `error`

- Error messages from the websocket API
- It is unknown if there is any standardization of the format

### `unknown`

- This is called when any unrecognizable messages are received
- Also provides a way to extend the capability of this library for currently unsupported messages

## 👤 Author

 **Stephen Mendez**

- Website: https://www.stephenmendez.dev
- Twitter: [@stephenmendez\_](https://twitter.com/stephenmendez_)
- Github: [@401unauthorized](https://github.com/401unauthorized)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/401unauthorized/smart-events/issues). You can also take a look at the [contributing guide](https://github.com/401unauthorized/smart-events/blob/master/CONTRIBUTING.md).

## 😃 Show your support

Give a ⭐️ if this project helped you!

Consider making a donation of any amount!

<a href="https://paypal.me/stephenmendez401" target="_blank">
    <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_200x51.png" alt="PayPal" />
</a>

## 📝 License

Copyright © 2021 Stephen Mendez<br />
This project is [MIT](https://github.com/401unauthorized/smart-events/blob/master/LICENSE) licensed.

---
SmartThings is a registered trademark of SmartThings, Inc.

Samsung is a registered trademark of Samsung Electronics Co., Ltd.

Google Chrome is a registered trademark of Google LLC

_Part of this README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

<img src="https://smart-events.goatcounter.com/count?p=/readme">

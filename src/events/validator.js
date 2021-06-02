const Ajv = require('ajv');

const ajv = new Ajv();

const connectSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer', const: 0 },
        nsp: { type: 'string' },
        data: {
            type: 'object',
            properties: {
                sid: { type: 'string' },
                upgrades: { type: 'array' },
                pingInterval: { type: 'integer' },
                pingTimeout: { type: 'integer' }
            }
        }
    },
    required: ['type', 'nsp', 'data'],
    additionalProperties: true
}

const alertSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer' },
        nsp: { type: 'string' },
        id: { type: 'integer' },
        data: { type: 'string' }
    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const pongSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer' },
        nsp: { type: 'string' }
    },
    required: ['type', 'nsp'],
    additionalProperties: false
}

const helloSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer' },
        nsp: { type: 'string' },
        id: { type: 'integer' },
    },
    required: ['type', 'nsp', 'id'],
    additionalProperties: false
}

const authenticatedSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer', 'const': 4 },
        nsp: { type: 'string' },
        id: { type: 'integer', 'const': 30 },
        data: {
            type: 'array',
            items: [{ type: 'null' }, {
                type: 'object',
                properties: {
                    userId: { type: 'string' },
                    sessionLength: { type: 'integer' },
                    stayLoggedIn: { type: 'boolean' }
                },
                required: ['userId', 'sessionLength', 'stayLoggedIn'],
            }],
            minItems: 2,
            maxItems: 2,
            uniqueItems: true,
            additionalItems: false
        },
    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const getUserSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer', 'const': 4 },
        nsp: { type: 'string' },
        id: { type: 'integer', 'const': 32 },
        data: {
            type: 'array',
            items: [{ type: 'null' }, {
                type: 'object',
                properties: {
                    principal: { type: 'string' },
                    user_name: { type: 'string' },
                    uuid: { type: 'string' }
                },
                required: ['principal', 'user_name', 'uuid'],
                additionalProperties: true
            }],
            minItems: 2,
            maxItems: 2,
            uniqueItems: true,
            additionalItems: false
        },
    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const locationSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer' },
        nsp: { type: 'string' },
        id: { type: 'integer' },
        data: {
            type: 'array',
            items: [{ type: 'null' }, {
                type: 'object',
                properties: {
                    locationId: { type: 'string' },
                },
                required: ['locationId'],
                additionalProperties: false
            }],
            minItems: 2,
            maxItems: 2,
            uniqueItems: true,
            additionalItems: false
        },

    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const getLocationsSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer', 'const': 4 },
        nsp: { type: 'string' },
        id: { type: 'integer', 'const': 31 },
        data: {
            type: 'array',
            items: [{ type: 'null' }, {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        locationId: { type: 'string' },
                        name: { type: 'string' },
                    },
                    required: ['locationId', 'name'],
                    additionalProperties: true
                },
                minItems: 1
            }],
            minItems: 2,
            additionalItems: false
        },
    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const getRoomsSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer', "const": 4 },
        nsp: { type: 'string' },
        id: { type: 'integer', "const": 38 },
        data: {
            type: 'array',
            items: [{ type: 'null' }, {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        roomId: { type: 'string' },
                        name: { type: 'string' },
                    },
                    required: ['roomId', 'name'],
                    additionalProperties: true
                },
                minItems: 1
            }],
            minItems: 2,
            additionalItems: false
        },
    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const stateSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer' },
        nsp: { type: 'string' },
        id: { type: 'integer' },
        data: {
            type: 'array',
            items: [{ type: 'string' }, {
                type: 'object',
                properties: {
                    state: { type: 'string' },
                    subscriptionId: { type: 'string' }
                },
                required: ['state', 'subscriptionId'],
                additionalProperties: false
            }],
            minItems: 2,
            maxItems: 2,
            uniqueItems: true,
            additionalItems: false
        },

    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const controlSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer' },
        nsp: { type: 'string' },
        id: { type: 'integer' },
        data: {
            type: 'array',
            items: [{ type: 'string' }, {
                type: 'object',
                properties: {
                    data: { type: 'string' },
                    subscriptionId: { type: 'string' }
                },
                required: ['data', 'subscriptionId'],
                additionalProperties: false
            }],
            minItems: 2,
            maxItems: 2,
            uniqueItems: true,
            additionalItems: false
        },

    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const deviceEvtSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer' },
        nsp: { type: 'string' },
        id: { type: 'integer' },
        data: {
            type: 'array',
            items: [{ type: 'string' }, {
                type: 'object',
                properties: {
                    data: {
                        type: 'object',
                        properties: {
                            deviceId: { type: 'string' }
                        },
                        required: ['deviceId'],
                    },
                    subscriptionId: { type: 'string' }
                },
                required: ['data', 'subscriptionId'],
            }],
            minItems: 2,
            maxItems: 2,
            uniqueItems: true,
            additionalItems: false
        },

    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const getDevicesSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer', 'const': 4 },
        nsp: { type: 'string' },
        id: { type: 'integer', 'const': 36 },
        data: {
            type: 'array',
            items: [{ type: 'null' }, {
                type: 'object',
                properties: {
                    data: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                type: { type: 'string' },
                                basic: { type: 'object' }
                            },
                            required: ['type', 'basic'],
                            additionalProperties: false
                        },
                        minItems: 1
                    },
                    etag: { type: 'string' },
                    version: { type: 'integer' },
                },
                required: ['data', 'etag', 'version'],
                additionalProperties: false
            }],
            minItems: 2,
            maxItems: 2,
            uniqueItems: true,
            additionalItems: false
        },
    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

const errorSchema = {
    type: 'object',
    properties: {
        type: { type: 'integer' },
        nsp: { type: 'string' },
        id: { type: 'integer' },
        data: {
            type: 'array',
            items: [{
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    message: { type: 'string' },
                    code: { type: 'integer' }
                },
                required: ['name', 'message', 'code'],
                additionalProperties: true
            }],
            minItems: 1,
            maxItems: 1,
            uniqueItems: true,
            additionalItems: false
        },
    },
    required: ['type', 'nsp', 'id', 'data'],
    additionalProperties: false
}

module.exports = {
    connect: ajv.compile(connectSchema),
    alert: ajv.compile(alertSchema),
    pong: ajv.compile(pongSchema),
    hello: ajv.compile(helloSchema),
    authentication: ajv.compile(authenticatedSchema),
    user: ajv.compile(getUserSchema),
    location: ajv.compile(locationSchema),
    locations: ajv.compile(getLocationsSchema),
    rooms: ajv.compile(getRoomsSchema),
    state: ajv.compile(stateSchema),
    control: ajv.compile(controlSchema),
    event: ajv.compile(deviceEvtSchema),
    devices: ajv.compile(getDevicesSchema),
    error: ajv.compile(errorSchema)
}

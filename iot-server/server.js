var mosca = require('mosca');
var pubsubsettings = {
    type: 'mongo',
    url: 'mongodb://etrusco:sandrino@ds033217.mongolab.com:33217/iot',
    pubsubCollection: 'iotCollections',
    mongo: {}
};

var persistencesettings = {
    factory: mosca.persistence.Mongo,
        url: 'mongodb://etrusco:sandrino@ds033217.mongolab.com:33217/iot'
}

var settings = {
    port: 1883
    //, backend: pubsubsettings
    //, persistence: persistencesettings
    , http: {
        port: 3000,
        bundle: true,
        static: './'
    }
};

//here we start mosca
var server = new mosca.Server(settings);

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running')
}

// fired whena  client is connected
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published : ', packet);
});

// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
    console.log('subscribed : ', topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
    console.log('unsubscribed : ', topic);
});

// fired when a client is disconnecting
server.on('clientDisconnecting', function(client) {
    console.log('clientDisconnecting : ', client.id);
});

// fired when a client is disconnected
server.on('clientDisconnected', function(client) {
    console.log('clientDisconnected : ', client.id);
});
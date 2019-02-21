const keys = require('./config/keys');
const axios = require('axios');
const tmi = require("tmi.js");

let options = {
    options: {
        debug: true
    },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: "fdeveloper",
        password: "oauth:j717s1n6rx2wvnj4fqm2sqyyswz3lf"
    },
    channels: [ "KadenLag", "fdeveloper"], // "JammaLive"
};

let client = new tmi.client(options);

// Register our event handlers
// client.on('connected', onConnectedHandler);

// Connect to Twitch
client.connect();

client.on("roomstate", function (channel, state) {
    // Do your stuff.
    console.log('channel', channel, 'state', state);
});

client.on('join', function (channel, username, self) {
    if (!self) return;
    if (self) { // bot joins channel
        axios.get('https://tmi.twitch.tv/group/user/kadenlag/chatters')
        .then(function (response) { // this is in its global reach
            // console.log('response', response.data.chatters);
            const viewers = response.data.chatter_count;
            const viewerNames = response.data.chatters;
            // console.log('viewers', viewers, 'viewerNames', viewerNames);
        })
        .catch(function (error) {
            console.log('error', error);
        })
        .then(function () {
            // always executed
        });
    }
});

client.on('chat', function (channel, userstate, message, self) {
    if (self) return;
    console.log('channel', channel, 'userstate', userstate);
});

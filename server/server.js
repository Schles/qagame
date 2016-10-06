"use strict";
var Hapi = require('hapi');
var archRoute = require("./routes/arch");
var qRoute = require("./routes/question");
var server = new Hapi.Server();
server.connection({
    port: 8000
});
server.register([
    {
        register: require('inert'),
        options: {}
    },
    {
        register: require('hapi-plugin-mysql'),
        options: {
            host: 'schles.me',
            user: 'what',
            password: 'y2UkvK3lFqsoOvlX',
            database: 'what'
        }
    }
], function (err) {
    server.route(qRoute);
    server.route(archRoute);
    server.start(function (err) {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
});
//# sourceMappingURL=server.js.map
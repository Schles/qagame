import * as Hapi from 'hapi';

var archRoute = require("./routes/arch");
var qRoute = require("./routes/question");
var adminRoute = require("./routes/admin");

const server = new Hapi.Server();

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
            host     : 'schles.me',
            user     : 'what',
            password : 'y2UkvK3lFqsoOvlX',
            database : 'what'
        }
    }
], (err) => {

    server.route(qRoute);
    server.route(adminRoute);
    server.route(archRoute);

    server.start((err) => {
        if (err) { throw err; }
        console.log('Server running at:', server.info.uri);
    });
});

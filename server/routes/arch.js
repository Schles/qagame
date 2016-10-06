module.exports = [
    {
        method: 'GET',
        path: '/q/{qId}/{uId}',
        handler: function (request, reply) {
            console.log("q case");
            return reply.file("public/index.html");
        }
    },
    {
        method: 'GET',
        path: '/a/{qId}',
        handler: function (request, reply) {
            console.log("a case");
            return reply.file("public/index.html");
        }
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public',
                listing: true
            }
        }
    },
    {
        method: 'GET',
        path: '/rx.js',
        handler: function (request, reply) {
            console.log("will haben");
            return reply.file("public/libs/angular2-build/rx.js");
        }
    }
];
//# sourceMappingURL=arch.js.map
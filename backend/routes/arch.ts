module.exports = [
    {
        method: 'GET',
        path:'/q/{qId}/{uId}',
        handler: function (request:any, reply:any) {
            console.log("q case");
            return reply.file("frontend/index.html");
        }
    },
    {
        method: 'GET',
        path:'/a/{qId}',
        handler: function (request:any, reply:any) {
            console.log("a case");
            return reply.file("frontend/index.html");
        }
    },
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'frontend',
                 listing: true
            }
        }
    },
    //Debug
    {
        method: 'GET',
        path:'/rx.js',
        handler: function (request:any, reply:any) {
            console.log("will haben");
            return reply.file("frontend/libs/angular2-build/rx.js");
        }
    }
];

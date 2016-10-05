module.exports = [
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
    //Debug
    {
        method: 'GET',
        path:'/rx.js',
        handler: function (request:any, reply:any) {
            console.log("will haben");
            return reply.file("public/libs/angular2-build/rx.js");
        }
    }
];

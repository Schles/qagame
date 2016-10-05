import * as q from 'q';

module.exports = [
    {
    method: 'GET',
    path:'/{qId}',
    handler: function (request:any, reply:any) {
        var defered = q.defer();
        request.app.db.query("select q.id, q.question from questions as q where q.id = '" + request.params["qId"] + "'", defered.makeNodeResolver());
        var q1 = defered.promise;

        var defered = q.defer();
        request.app.db.query("select a.aId, a.answer from answers as a where a.qId = '" + request.params["qId"] + "'", defered.makeNodeResolver());
        var q2 = defered.promise;

        q.all([q1,q2]).then(function(results:any){

            if(results[0][0].length == 0)
                return reply('Empty Query: ' + request.params['qId']);

            var result:any = new Object();
            result.qId = {};
            result.qId = results[0][0][0].id;
            result.question = results[0][0][0].question;

            result.answers = [];

            for(var i in results[1][0]){
                var answer:any = new Object();
                answer.aId = results[1][0][i].aId;
                answer.answer = results[1][0][i].answer;
                result.answers.push(answer);
            }

            console.log(result);        

            return reply(JSON.stringify(result));
        }).catch(function(err:any){
            console.log(err);
            return reply('error ' + request.params['qId']);
        });

    //return reply("hallo");
    }
}
];

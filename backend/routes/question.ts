import * as q from 'q';

module.exports = [
    {
        method: 'GET',
        path:'/data/q/{qId}',
        handler: function (request:any, reply:any) {
            let authToken = request.headers["authtoken"];


            let qs:any = [];

            console.log("da fragt einer");
            var defered = q.defer();
            request.app.db.query("select q.id, q.question from questions as q where q.id = '" + request.params["qId"] + "'", defered.makeNodeResolver());
            var q1 = defered.promise;
            qs.push(q1);

            var defered = q.defer();
            request.app.db.query("select a.aId, a.answer from answers as a where a.qId = '" + request.params["qId"] + "'", defered.makeNodeResolver());
            var q2 = defered.promise;
            qs.push(q2);

            var defered = q.defer();
            request.app.db.query("SELECT aId, count(*) as NUM FROM submitted where qId = '" + request.params["qId"] + "' GROUP BY aId ORDER BY aId asc", defered.makeNodeResolver());
            var q4 = defered.promise;
            qs.push(q4);

            if(authToken != undefined) {
                console.log("auth exists");

                var defered = q.defer();
                request.app.db.query("SELECT 1 FROM submitted WHERE uId = '" + authToken + "' AND qId = '" + request.params["qId"] + "'", defered.makeNodeResolver());
                var q3 = defered.promise;
                qs.push(q3);
            }



            q.all(qs).then(function(results:any){

                if(results[0][0].length == 0)
                    return reply('Empty Query: ' + request.params['qId']);

                var result:any = new Object();
                result.qId = {};
                result.qId = results[0][0][0].id;
                result.qText = results[0][0][0].question;

                result.answers = [];
                result.hasVoted = false;
                result.voteCount = 0;

                if(results.length > 3){
                    if(results[3][0].length > 0)
                        result.hasVoted = true;
                }

                for(var i in results[1][0]){
                    var answer:any = new Object();
                    answer.aId = results[1][0][i].aId;
                    answer.aText = results[1][0][i].answer;
                    answer.votes = 0;

                    for(var j in results[2][0]){
                        if(results[2][0][j].aId == answer.aId){
                            if(result.hasVoted)
                                answer.votes = results[2][0][j].NUM;
                            result.voteCount += results[2][0][j].NUM;
                        }
                    }
                    result.answers.push(answer);
                }

                return reply(JSON.stringify(result));
            });
        }
    },
    {
        method: 'GET',
        path:'/data/nextQ',
        handler: function (request:any, reply:any) {
            let authToken = request.headers["authtoken"];

            //SELECT id FROM `questions` as A LEFT JOIN ( SELECT qId, uId FROM `submitted` WHERE uId = '" + authToken + "') AS B on A.id = B.qId WHERE B.uId IS NULL

            request.app.db.query("SELECT id FROM `questions`", function(err:any, row:any, fields:any){

                let indexNextQ = Math.floor((Math.random() * row.length));
                let nextQ = row[indexNextQ].id;

                return reply(nextQ);
            });


        }
    },
    {
        method: 'POST',
        path:'/data/q',
        handler: function (request:any, reply:any) {
            console.log("save this!");
            console.log(request.payload);

            let uId = request.payload["uId"];
            let qId = request.payload["qId"];
            let aId = request.payload["aId"];

            request.app.db.query("INSERT INTO `submitted` (`uId`, `qId`, `aId`) VALUES ('" + uId + "', '" + qId + "', '" + aId + "');", function(err:any, row:any, fields:any){
                if(err)
                    console.log(err);

                request.app.db.query("SELECT aId, count(*) as NUM FROM submitted where qId = '" + qId + "' GROUP BY aId ORDER BY aId asc", function(err:any, row:any, fields:any){
                    console.log(row);

                    return reply(JSON.stringify(row));
                });

            });
        }

    }
];

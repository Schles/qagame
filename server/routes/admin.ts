module.exports = [
    {
        method: 'GET',
        path:'/control/q',
        handler: function (request:any, reply:any) {
            //let authToken = request.headers["authtoken"];

            request.app.db.query("SELECT * FROM `questions`;", function(err, row, fields){
                if(err)
                    console.log(err);

                console.log(row);

                return reply(JSON.stringify(row));
            });

            console.log("hallo");
        }
    },
    {
        method: 'GET',
        path:'/control/q/{qId}',
        handler: function (request:any, reply:any) {
            //let authToken = request.headers["authtoken"];


            let qs = [];

            console.log("hallo");
        }
    },
    {
        method: 'POST',
        path:'/control/q/new',
        handler: function (request:any, reply:any) {
            //let authToken = request.headers["authtoken"];

            let uId = new Date().valueOf() - 1477000000000;



            //(LAST_INSERT_ID(),1, "12");

            let question = request.payload["question"];
            let answers = request.payload["answers"];

            let sqlQuestionQuery = "INSERT INTO questions (id, question) VALUES (" + uId + ", '" + question + "');"

            let sqlAnswerQuery = "INSERT INTO answers (qId, aId, answer) VALUES ";

            for(let i in answers){

                sqlAnswerQuery += "('" + uId + "','" + i + "', '" + answers[i].aText + "')";

                if(i < (answers.length - 1))
                    sqlAnswerQuery += ", ";
                else
                    sqlAnswerQuery += ";";
            }

            request.app.db.query(sqlQuestionQuery, function(err, row, fields){
                if(err)
                    console.log(err);

                request.app.db.query(sqlAnswerQuery, function(err, row, fields){
                    console.log(row);

                    return reply(JSON.stringify(uId));
                });

            });


        }
    },
    {
        method: 'POST',
        path:'/control/q/delete',
        handler: function (request:any, reply:any) {
            //let authToken = request.headers["authtoken"];

            let qId = request.payload["qId"];



            request.app.db.query("DELETE FROM answers where qId = " + qId + ";", function(err, row, fields){
                if(err)
                    console.log(err);

                request.app.db.query("DELETE FROM submitted where qId = " + qId + ";", function(err, row, fields){
                    if(err)
                        console.log(err);

                        request.app.db.query("DELETE FROM questions where id = " + qId + ";", function(err, row, fields){
                            if(err)
                                console.log(err);

                                console.log("ost raus");
                                return reply();

                        });

                });



            });


        }
    }
];

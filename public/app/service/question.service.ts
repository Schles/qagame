import {Injectable} from '@angular/core';
import {Http, Headers , RequestOptions} from '@angular/http';

import 'rxjs/Rx';

@Injectable()
export class QuestionService {

  constructor(http:Http) {
      this.http = http;
  }



 // Methods using the http object
  getQuestion(uId: any, qId: any) {
      let headers = new Headers({'authToken': uId});
      let options = new RequestOptions({ headers: headers });
      return this.http.get('/data/q/' + qId, options).map(res => res.json());
  }

  setAnswer(qId:any, aId:any, uId:any){
      let body = JSON.stringify({ qId: qId, aId: aId, uId: uId });
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('/data/q',body, options);
  }

  newQuestion(question:any, answers:any, uId:any){
      let body = JSON.stringify({ question: question, answers: answers});
      let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': uId });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('/control/q/new',body, options);
  }

  getQuestionList(uId: any) {
      let headers = new Headers({'authToken': uId});
      let options = new RequestOptions({ headers: headers });
      return this.http.get('/control/q', options).map(res => res.json());
  }

  deleteQuestion(uId: any, qId: any) {
      let body = JSON.stringify({ qId: qId});
      let headers = new Headers({ 'Content-Type': 'application/json', 'authToken': uId });
      let options = new RequestOptions({ headers: headers });

      return this.http.post('/control/q/delete',body, options);
  }

  getNextQuestionId(uId: any){
      let headers = new Headers({'authToken': uId});
      let options = new RequestOptions({ headers: headers });
      
      return this.http.get('/data/nextQ', options).map(res => res.json());
  }


}

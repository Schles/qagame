import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { AuthService } from '../service/auth.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Http } from '@angular/http';

@Component({
  selector: 'question',
  template: `
  <div class="question">
  <h1>{{question.qText}}</h1> <br>
  <ul>
       <li *ngFor="let answer of question.answers" (click)="setAnswer(answer.aId)">

           <div class="card">{{answer.aText}}</div>
           <div class="result"
              *ngIf="question.voteCount > 0">
              <div class="bar"
               [style.width]="getPercentage(answer.votes) + 'px'"></div>
              {{getPercentage(answer.votes)}}%

          </div>
           <div class="clear"></div>
       </li>
  </ul><br>
  <div     *ngIf="question.voteCount > 0">
  VoteCount {{question.voteCount}}
  </div>
  <a (click)="nextQuestion()">Nächste Frage</a>
  </div>`,
  providers: [QuestionService, AuthService]
})
export class QuestionComponent implements OnInit{

    private uId = 1;
    private qId = 1;
    private question = {};

    constructor(private questionService:QuestionService,
                private authService:AuthService,
                private router: Router,
                private route: ActivatedRoute){
    }

    ngOnInit() {

        this.uId = this.authService.getUserId();

        this.route.params.forEach((params: Params) => {
            this.qId = +params["id"];

            console.log("Hallo " + this.qId);

            this.questionService.getQuestion(this.uId, this.qId).subscribe(
                data => this.question = data,
                error => this.error = "error"
            );
        });
    }

    public getPercentage(count:any){
        if(this.question.voteCount <= 0)
            return 0;

        let p = count * 100 / this.question.voteCount;
        return Math.round( p * 10) / 10;
    }

    public nextQuestion() {

        this.questionService.getNextQuestionId(this.uId).subscribe(
            data => {
                this.router.navigate(['/q/', data]);
            },
            error => this.error = "error"
        );
        //
    }


    public setAnswer = (aId:any) => {
        let qId = this.route.snapshot.params.id;

        questionService.setAnswer(qId,aId, this.uId).subscribe(
            data => {
                let votes = JSON.parse(data._body);

                this.question.voteCount = 0;

                for(var i in this.question.answers){
                    this.question.answers[i].votes = 0;
                    for(var j in votes){
                        if(this.question.answers[i].aId == votes[j].aId){
                            this.question.answers[i].votes = votes[j].NUM;
                            this.question.voteCount += votes[j].NUM;
                        }
                    }
                }
            },
            error => this.error = "error"
        );
    }
}

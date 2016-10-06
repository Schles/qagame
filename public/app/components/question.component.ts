import { Component } from '@angular/core';
import { QuestionService } from '../service/question.service';

import { ActivatedRoute } from '@angular/router';

import { Http } from '@angular/http';

@Component({
  selector: 'question',
  template: `
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
  </div>`,
  providers: [QuestionService]
})
export class QuestionComponent implements OnInit{

    private uId = 25;

    constructor(private questionService:QuestionService, private route: ActivatedRoute){
        this.question = {};
    }

    ngOnInit() {
        console.log("init");

        this.uId = this.route.snapshot.params.uId;
        let qId = this.route.snapshot.params.id;

        this.questionService.getQuestion(this.uId, qId).subscribe(
            data => this.question = data,
            error => this.error = "error"
        );

        /*type) QA Game

        this.route.params
         .map(params => params['id'])
         .subscribe((id) => {
             console.log(id);
         });
         */
    }

    public getPercentage(count:any){
        if(this.question.voteCount <= 0)
            return 0;

        let p = count * 100 / this.question.voteCount;
        return Math.round( p * 10) / 10;
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

//questionService:QuestionService

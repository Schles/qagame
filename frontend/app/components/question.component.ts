import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { AuthService } from '../service/auth.service';

import { ActivatedRoute, Router, Params } from '@angular/router';

import { Question } from '../entity/question'

import { Http } from '@angular/http';

@Component({
  selector: 'question',
  template: `

      <div class="dropShadow card question">
        <div class="text"><div class="badge">{{question.voteCount}}<br>Votes</div>{{question.qText}} <br class="clear"/></div>

      </div>
      <ul>
            <li *ngFor="let answer of question.answers" (click)="setAnswer(answer.aId)" class="answerContainer dropShadow">


                <div class="whitebg"></div>
                <div class="blackbg" *ngIf="question.hasVoted" [style.width]="getPercentage(answer.votes) + '%'" ></div>
                <div class="makered"></div>
                <span>{{answer.aText}}</span>

           <!--
           <div class="result" *ngIf="question.voteCount > 0">
              <div class="bar"
               [style.width]="getPercentage(answer.votes) + 'px'"></div>
              {{getPercentage(answer.votes)}}%

          </div>
          -->
       </li>
  </ul><br>
    <div class="card button" (click)="nextQuestion()">
        Nächste Frage
    </div>`,
  providers: [QuestionService, AuthService]
})
export class QuestionComponent implements OnInit{

    private uId:number = 1;
    private qId:number = 1;
    private error:any;
    private question:Question = new Question();

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
                (data:any) => this.question = data,
                (error:any) => this.error = "error"
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
            (data:any) => {
                this.router.navigate(['/q/', data]);
            },
            (error:any) => this.error = "error"
        );
        //
    }


    public setAnswer = (aId:any) => {
        this.questionService.setAnswer(this.qId, aId, this.uId).subscribe(
            (data:any) => {
                let votes = JSON.parse(data._body);

                this.question.voteCount = 0;
                this.question.hasVoted = true;
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
            (error:any) => this.error = "error"
        );
    }
}

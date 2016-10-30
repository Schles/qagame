import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { AuthService } from '../service/auth.service';

import { ActivatedRoute, Router, Params } from '@angular/router';

import { Http } from '@angular/http';

@Component({
  selector: 'admin',
  template: `
  <div class="newQ">
    <h1>Neue Frage erstellen</h1>
    <br>
    <h2>Frage:</h2>
    <textarea [(ngModel)]="question" placeholder="Frage"></textarea>
    <br>
    <br>
    <h2>Antworten:</h2>
    <ul>
    <li *ngFor="let a of answers">
      {{a.aText}}    <a (click)="deleteAnswer(a)">(Del)</a>
    </li>
    <li>
        <input [(ngModel)]="answerText" placeholder="Neue Antwort hinzufügen"/>
        <button (click)="addAnswer()">hinzufügen</button>
    </li>
    </ul>
    <button (click)="addQuestion()">Hinzufügen</button>
    <button (click)="deleteQuestion()">Löschen</button>
    </div>
  `,
  providers: [QuestionService, AuthService]
})
export class AdminDetailComponent implements OnInit{

    private uId:number = 1;
    private qId:number = 1;
    private error:any;
    private question:string;
    private answers:any[] = [];
    private answerText:string = "";

    constructor(private questionService:QuestionService,
                private authService:AuthService,
                private router: Router,
                private route: ActivatedRoute){

    }

    ngOnInit() {

        this.uId = this.authService.getUserId();

        this.route.params.forEach((params: Params) => {
            this.qId = +params["id"];


            if(isNaN(this.qId))
                console.log("new case");
            else {
                console.log("Hallo " + this.qId);

                this.questionService.getQuestion(this.uId, this.qId).subscribe(
                    data => {
                        console.log(data);
                        this.question = data.qText;
                        this.answers = data.answers;
                    },
                    error => this.error = "error"
                );
            }



            /*

            */
        });
    }

    public addQuestion(){


        this.questionService.newQuestion(this.question,this.answers, this.uId).subscribe(
            (data:any) => {
                console.log("ist abgesendet" + data._body);
                this.router.navigate(['/admin', data._body]);
            },
            (error:any) => this.error = "error"
        );
    }

    public addAnswer(){
        if(this.answerText.length > 0){
            let answer = {
                aText: this.answerText
            };
            this.answers.push(answer);
            this.answerText = ""
        }
    }

    public deleteQuestion(){
        this.questionService.deleteQuestion(this.uId, this.qId).subscribe(
            data => {
                console.log("ist gelöscht");
                this.router.navigate(['/admin']);
            },
            error => this.error = "error"
        );
    }

    public deleteAnswer(a:any){
        console.log(a);
        var index = this.answers.indexOf(a);
        this.answers.splice(index, 1);
    }

}

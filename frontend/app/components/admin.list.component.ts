import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { AuthService } from '../service/auth.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Http } from '@angular/http';

@Component({
  selector: 'adminlist',
  template: `
  Hi Admin List
  <ul>
  <li *ngFor="let question of questions" (click)="onSelect(question.id)">
    {{question.id}} <div class="short">{{question.question}}</div>
  </li>
  <li (click)="newQuestion()">
    Neu
  </li>
  </ul>`,
  providers: [QuestionService]
})
export class AdminListComponent implements OnInit{

    private uId:number = 1;
    private qId:number = 1;
    private error:any;
    private questions:any[] = [];

    constructor(private questionService:QuestionService,
                private authService:AuthService,
                private router: Router,
                private route: ActivatedRoute){


    }

    ngOnInit() {
        this.uId = this.authService.getUserId();

        this.questionService.getQuestionList(this.uId).subscribe(
            (data:any) => this.questions = data,
            (error:any) => this.error = "error"
        );
    }

    public onSelect(q: any){
        this.router.navigate(['/admin', q]);
    }

    public newQuestion(){
        this.router.navigate(['/admin/new']);
    }


}

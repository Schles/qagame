import {provideRouter, RouterConfig } from '@angular/router';
import {AppComponent} from './app'
import {QuestionComponent} from './components/question.component'


export const ContactsAppRoutes = [
  { path: '', component: QuestionComponent },
  { path: 'q/:id/:uId', component: QuestionComponent },
  { path: 'a/:id', component: QuestionComponent },
];

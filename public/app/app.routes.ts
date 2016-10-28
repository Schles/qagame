import {provideRouter, RouterConfig } from '@angular/router';
import {AppComponent} from './app'
import {LoginComponent} from './components/login.component'
import {QuestionComponent} from './components/question.component'
import {AdminDetailComponent} from './components/admin.detail.component'
import {AdminListComponent} from './components/admin.list.component'

import { AuthGuard } from './guards/auth.guard';

export const ContactsAppRoutes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: QuestionComponent},
  { path: 'q/:id', component: QuestionComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminListComponent },
  { path: 'admin/new', component: AdminDetailComponent },
  { path: 'admin/:id', component: AdminDetailComponent },
];

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { LocationStrategy,  HashLocationStrategy } from '@angular/common';
import { LoginComponent } from './components/login.component';
import { QuestionComponent } from './components/question.component';
import { AdminDetailComponent } from './components/admin.detail.component';
import { AdminListComponent } from './components/admin.list.component';
import { ContactsAppRoutes } from './app.routes';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './service/auth.service';

import { AppComponent }   from './app.component';
@NgModule({
  imports:      [ BrowserModule, HttpModule, RouterModule.forRoot(ContactsAppRoutes), FormsModule ],
  declarations: [ AppComponent, LoginComponent, QuestionComponent, AdminListComponent, AdminDetailComponent ],
  providers: [AuthGuard, AuthService, {provide: LocationStrategy, useClass: HashLocationStrategy}], //,
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

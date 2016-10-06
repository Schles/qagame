import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { QuestionComponent } from './components/question.component';
import { ContactsAppRoutes } from './app.routes';

import { AppComponent }   from './app.component';
@NgModule({
  imports:      [ BrowserModule, HttpModule, RouterModule.forRoot(ContactsAppRoutes) ],
  declarations: [ AppComponent, QuestionComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

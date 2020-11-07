import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { of } from 'rxjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { STORE, SubjectStore } from './application/store';
import { UsersState } from './application/users.state';
import { UserAggregate } from './domain/user.aggregate';
import { UsersService } from './infrastructure/users.service';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: STORE,
      useClass: SubjectStore
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { STORE, SubjectStore } from './store';
import { USERS_SERVICE_URL } from './infrastructure/users.service';
import { PactTokenInterceptor } from './pact.token-interceptor';
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
      provide: HTTP_INTERCEPTORS,
      useClass: PactTokenInterceptor,
      multi: true
    },
    {
      provide: USERS_SERVICE_URL,
      useValue: environment.usersUrl
    },
    {
      provide: STORE,
      useClass: SubjectStore
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserAggregate } from '../domain/user.aggregate';

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private client: HttpClient) {}

  getAll(): Observable<any> {
    return of([new UserAggregate('dsdsassda')]);
  }
}

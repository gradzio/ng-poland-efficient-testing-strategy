import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserAggregate } from '../domain/user.aggregate';
import { UsersService } from '../infrastructure/users.service';
import { SubjectState } from './store';

export class FetchUsersAction {}

@Injectable({providedIn: 'root'})
export class UsersState {
  private dataSubject = new Subject<UserAggregate[]>();

  users$ = this.dataSubject.asObservable();

  constructor(private usersService: UsersService) {}

  fetchUsers(action: FetchUsersAction): void {
    this.usersService.getAll().pipe(
      tap(users => this.dataSubject.next(users))
    ).subscribe();
  }
}

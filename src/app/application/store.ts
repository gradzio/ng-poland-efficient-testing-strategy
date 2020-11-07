import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Injectable, InjectionToken } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { UserAggregate } from '../domain/user.aggregate';
import { FetchUsersAction, UsersState } from './users.state';

export interface Store {
  dispatch(action): void;

  select(stateName: string): Observable<any>;
}

export const STORE = new InjectionToken<Store>('STORE');

@Injectable({providedIn: 'root'})
export class SubjectStore implements Store {
  private bus = new BehaviorSubject({ users: [] });

  constructor(private usersState: UsersState) {
    this.usersState.users$.pipe(
      tap(users => console.log('users', users)),
      tap(users => this.bus.next({users}))
    ).subscribe();
  }

  dispatch(action): void {
    this.usersState.fetchUsers(action);
  }

  select(stateName: string): Observable<any> {
    return this.bus.asObservable().pipe(
      map(all => all[stateName])
    );
  }
}

export class SubjectState {
  private dataSubject = new Subject<any>();
}

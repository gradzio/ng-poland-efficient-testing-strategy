import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Injectable, InjectionToken } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { UserAggregate } from '../domain/user.aggregate';
import { usersSelector } from './users.selector';
import { FetchUsersAction, initialUserState, UsersState, UsersStateModel } from './users.state';

export interface Store {
  dispatch(action): void;

  select(stateName: string): Observable<any>;
}

export const STORE = new InjectionToken<Store>('STORE');

@Injectable({providedIn: 'root'})
export class SubjectStore implements Store {
  private bus = new BehaviorSubject<{users: UsersStateModel}>({ users: initialUserState });

  constructor(private usersState: UsersState) {
  }

  dispatch(action): void {
    const usersState = this.bus.getValue();
    this.usersState.fetchUsers(action, usersState.users).pipe(
      tap(usersStateModel => this.bus.next({
        users: usersStateModel
      }))
    ).subscribe();
  }

  select(selector: string): Observable<any> {
    return this.bus.asObservable().pipe(
      map(all => usersSelector(all.users))
    );
  }
}

export class SubjectState {
  private dataSubject = new Subject<any>();
}

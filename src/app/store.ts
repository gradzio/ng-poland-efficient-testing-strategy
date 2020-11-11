import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { usersSelector } from './application/users.selector';
import { initialUserState, UsersState, UsersStateModel } from './application/users.state';

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

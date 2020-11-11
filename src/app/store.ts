import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, InjectionToken, NgModule } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { initialUserState, UsersState, UsersStateModel } from './application/users.state';

export interface Store {
  dispatch(action): void;

  select(selector: any): any;

  setState(state): void;
}

export const STORE = new InjectionToken<Store>('STORE');

const toFunctionName = (str) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '').replace(/Action$/, '');
};

@Injectable({providedIn: 'root'})
export class SubjectStore implements Store {
  private bus = new BehaviorSubject<{usersState: UsersStateModel}>({ usersState: initialUserState });

  constructor(private usersState: UsersState) {
  }

  dispatch(action): void {
    const allData = this.bus.getValue();
    this.usersState[toFunctionName(action.constructor.name)](action, allData.usersState).pipe(
      tap((usersStateModel: UsersStateModel) => this.bus.next({
        usersState: usersStateModel
      }))
    ).subscribe();
  }

  select(selector: (state: UsersStateModel) => any): Observable<any> {
    return this.bus.asObservable().pipe(
      map(all => selector(all.usersState))
    );
  }

  setState(data: {usersState: UsersStateModel}): void {
    this.bus.next(data);
  }
}

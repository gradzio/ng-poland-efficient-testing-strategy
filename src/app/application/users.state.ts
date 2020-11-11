import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAggregate } from '../domain/user.aggregate';
import { UsersService } from '../infrastructure/users.service';
import { FetchUsersAction, RemoveUser } from './users.actions';

export interface UsersStateModel {
  users: UserAggregate[];
}

export const initialUserState: UsersStateModel = {
  users: []
};

@Injectable({providedIn: 'root'})
export class UsersState {
  constructor(private usersService: UsersService) {}

  fetchUsers(action: FetchUsersAction, state: UsersStateModel): Observable<UsersStateModel> {
    return this.usersService.getAll().pipe(
        map((users: UserAggregate[]) => ({ ...state, users})
      )
    );
  }

  removeUser(action: RemoveUser, state: UsersStateModel): Observable<UsersStateModel> {
    return this.usersService.removeById(action.id)
      .pipe(
        map(_ => ({ ...state, users: state.users.filter(user => user.id !== action.id)}))
      );
  }
}

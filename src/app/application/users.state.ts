import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAggregate } from '../domain/user.aggregate';
import { UsersService } from '../infrastructure/users.service';

export class FetchUsersAction {}

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
}

import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchUsersAction, RemoveUser } from '../../application/users.actions';
import { usersSelector } from '../../application/users.selectors';
import { STORE, Store } from '../../store';
import { UserAggregate } from '../../domain/user.aggregate';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users$: Observable<UserAggregate[]>;

  constructor(@Inject(STORE) private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new FetchUsersAction());
    this.users$ = this.store.select(usersSelector);
  }

  onDeleteUser(id: string): void {
    this.store.dispatch(new RemoveUser(id));
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { STORE, Store } from '../../application/store';
import { FetchUsersAction } from '../../application/users.state';
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
    this.users$ = this.store.select('users');
  }
}

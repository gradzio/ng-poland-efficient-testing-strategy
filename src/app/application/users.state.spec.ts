import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { UserAggregate } from '../domain/user.aggregate';
import { STORE, Store, SubjectStore } from './store';
import { FetchUsersAction, UsersState } from './users.state';

fdescribe('UserState', () => {
  let store: Store;
  let state: UsersState;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: STORE, useClass: SubjectStore },
        UsersState
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(STORE);
    state = TestBed.inject(UsersState);
  });

  it('should fetch users', fakeAsync(() => {
    const userGreg = new UserAggregate('Greg');
    store.dispatch(new FetchUsersAction());

    tick();

    store.select('users').subscribe(users => {
      expect(users[0]).toEqual(userGreg);
    });
  }));
});

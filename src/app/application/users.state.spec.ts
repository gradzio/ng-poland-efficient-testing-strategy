import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserAggregate } from '../domain/user.aggregate';
import { UsersService } from '../infrastructure/users.service';
import { STORE, Store, SubjectStore } from '../store';
import { FetchUsersAction, RemoveUser } from './users.actions';
import { usersSelector } from './users.selectors';
import { UsersState } from './users.state';

describe('UserState', () => {
  let store: Store;
  let state: UsersState;
  let service: UsersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAll: () => of([]),
            removeById: (id: string) => of(true)
          }
        },
        { provide: STORE, useClass: SubjectStore },
        UsersState
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.inject(STORE);
    state = TestBed.inject(UsersState);
    service = TestBed.inject(UsersService);
  });

  it('should fetch users', fakeAsync(() => {
    // Given there are no users
    store.setState({usersState: { users: []}});

    // When I fetch all users containing user "Greg"
    const userGreg = UserAggregate.fromName('Greg');
    spyOn(service, 'getAll').and.returnValue(of([userGreg]));
    store.dispatch(new FetchUsersAction());

    tick();

    // Then I should have this user
    store.select(usersSelector).subscribe(users => {
      expect(users[0]).toEqual(userGreg);
    });
  }));

  it('should delete a user', () => {
    // Given there are two users: "Greg" and "Tom"
    const userGreg = UserAggregate.fromName('Greg');
    const userTom = UserAggregate.fromName('Tom');
    store.setState({usersState: { users: [userGreg, userTom]} });

    // When I delete a user "Tom"
    store.dispatch(new RemoveUser(userTom.id));

    // Then I should only have "Greg" user
    store.select(usersSelector).subscribe(users => {
      expect(users.length).toEqual(1);
      expect(users[0]).toEqual(userGreg);
    });
  });
});

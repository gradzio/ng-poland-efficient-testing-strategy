import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserAggregate } from '../domain/user.aggregate';
import { UsersService } from '../infrastructure/users.service';
import { STORE, Store, SubjectStore } from './store';
import { FetchUsersAction, UsersState } from './users.state';

describe('UserState', () => {
  let store: Store;
  let state: UsersState;
  let service: UsersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UsersService, useValue: {
            getAll: () => of([])
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
    const userGreg = new UserAggregate('Greg');
    spyOn(service, 'getAll').and.returnValue(of([userGreg]));
    store.dispatch(new FetchUsersAction());

    tick();

    store.select('users').subscribe(users => {
      expect(users[0]).toEqual(userGreg);
    });
  }));
});

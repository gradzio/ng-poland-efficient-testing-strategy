import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { UserAggregate } from '../../domain/user.aggregate';

import { UsersComponent } from './users.component';
import { Store, STORE } from '../../store';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let store: Store;

  const makeRandomUsers = (count: number) => new Array(count).fill(UserAggregate.fromName(`Name  ${Math.random()}`));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      providers: [
        { provide: STORE, useValue: {
            dispatch: () => {},
            select: () => {}
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(STORE);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show list of users', fakeAsync(() => {
    const users = makeRandomUsers(Math.ceil(Math.random() * 100));
    spyOn(store, 'select').and.returnValue(of(users));
    // Runs lifecycle hooks like ngOnInit
    fixture.detectChanges();

    component.users$.subscribe(_ => {
      const listOfUsers = fixture.debugElement.query(By.css('ul.users'));
      const userRows = listOfUsers.queryAll(By.css('li'));
      expect(listOfUsers).toBeTruthy();
      expect(userRows.length).toEqual(users.length);
      expect(userRows[0].nativeElement.textContent).toContain(users[0].name);
    });
  }));
});

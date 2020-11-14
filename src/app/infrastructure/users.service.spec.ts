import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { PactWeb } from '@pact-foundation/pact-web';
import { USERS_SERVICE_URL, UsersService } from './users.service';
import usersResponse from './users.json';

describe('UsersService', () => {
  let service: UsersService;
  let provider: PactWeb;

  beforeAll(done => {
    provider = new PactWeb({
      cors: true,
      port: 8100,
      log: require('path').resolve(process.cwd(), 'pacts', 'pact.log'),
      dir: 'pacts',
      spec: 2
    });

    setTimeout(done, 2000);

    provider.removeInteractions();
  });

  afterAll(done => {
    provider.finalize().then(
      () => {
        done();
      },
      err => {
        done.fail(err);
      }
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UsersService,
        { provide: USERS_SERVICE_URL, useValue: 'http://localhost:8100' }
      ]
    });

    service = TestBed.inject(UsersService);
  });

  describe('getAll', () => {
    beforeEach(done => {
      provider
        .addInteraction({
        state: 'there is 1 user',
        uponReceiving: 'GET /users',
        withRequest: {
          method: 'GET',
          path: '/users'
        },
        willRespondWith: {
          status: 200,
          body: usersResponse
        }
      }).then(done, error => done.fail(error));
    });

    it('getAll', done => {
      service.getAll().subscribe(users => {
        expect(users.length).toEqual(usersResponse.data.length);
        done();
      });

    });
  });

  describe('removeById', () => {
    const userId = '1';
    beforeEach(done => {
      provider
        .addInteraction({
          state: `there is a user with id ${userId}`,
          uponReceiving: `DELETE /users/${userId}`,
          withRequest: {
            method: 'DELETE',
            path: `/users/${userId}`
          },
          willRespondWith: {
            status: 204,
            body: []
          }
        }).then(done, error => done.fail(error));
    });

    it('removeById', done => {
      service.removeById(userId).subscribe(isDeleted => {
        expect(isDeleted).toEqual(true);
        done();
      });
    });
  });

});

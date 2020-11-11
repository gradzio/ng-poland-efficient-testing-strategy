import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserAggregate } from '../domain/user.aggregate';

export const USERS_SERVICE_URL = new InjectionToken<string>('USERS_SERVICE_URL');

interface Response<T> {
  data: T[];
}

interface HasIdAndName {
  id: string;
  name: string;
}

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private client: HttpClient, @Inject(USERS_SERVICE_URL) private baseUrl: string) {}

  getAll(): Observable<UserAggregate[]> {
    return this.client.get(`${this.baseUrl}/users`)
      .pipe(
        map((response: Response<HasIdAndName>) => response.data.map(item => new UserAggregate(item.id, item.name)))
      );
  }

  removeById(id: string): Observable<boolean> {
    return this.client.delete(`${this.baseUrl}/users/${id}`)
      .pipe(
        map(_ => true)
      );
  }
}

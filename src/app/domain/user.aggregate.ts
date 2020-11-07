import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserAggregate {
  public readonly id: string;
  constructor(public readonly name: string) {
    this.id = `${new Date().getUTCMilliseconds()}-${Math.random() * 10}`;
  }

}

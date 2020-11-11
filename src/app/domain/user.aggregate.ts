
export class UserAggregate {
  constructor(public readonly id: string, public readonly name: string) {}

  static fromName(name): UserAggregate {
    return new UserAggregate(`${new Date().getUTCMilliseconds()}-${Math.random() * 10}`, name);
  }
}

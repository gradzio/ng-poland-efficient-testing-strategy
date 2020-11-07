import { UserAggregate } from './user.aggregate';

describe('UserAggregate', () => {
  it('should create', () => {
    const name = 'Greg';
    const user = new UserAggregate(name);

    expect(user.id).toEqual(jasmine.any(String));
    expect(user).toEqual(jasmine.objectContaining({
      name
    }));
  });
});

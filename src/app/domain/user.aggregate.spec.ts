import { UserAggregate } from './user.aggregate';

describe('UserAggregate', () => {
  it('should create', () => {
    const name = 'Greg';
    const id = '1';
    const user = new UserAggregate(id, name);

    expect(user.id).toEqual(jasmine.any(String));
    expect(user).toEqual(jasmine.objectContaining({
      id,
      name
    }));
  });
});

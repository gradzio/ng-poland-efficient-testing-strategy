# EfficientTestingStrategy

## Show list of Users
Story: As an admin I want to see a list of users
```
Given there are no users
When I fetch all users containing user "Greg"
Then I should have this user
```

Story: As an admin I want to select a user
```
Given There are two users: "Greg" and "Tom"
When I select a user "Tom"
Then "Tom" user should be selected
```
`Example:`
```
it('should show selected user', () => {
    // Given there are two users: "Greg" and "Tom"
    const userGreg = UserAggregate.fromName('Greg');
    const userTom = UserAggregate.fromName('Tom');
    store.setState({usersState: { users: [userGreg, userTom]} });

    // When I select a user "Tom"
    store.dispatch(new SelectUser(userTom.id));

    // Then "Tom" user should be selected
    store.select(selectedUser).subscribe(user => {
      expect(user).toEqual(userTom);
    });
  });
```

Story: As an admin I want to delete the user
```
Given There are two users: "Greg" and "Tom"
When I remove a user "Tom"
Then I should only have user "Greg"
```
`Example:`
```
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
```


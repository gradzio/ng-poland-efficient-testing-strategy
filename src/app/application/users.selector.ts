import { UsersState, UsersStateModel } from './users.state';

export const usersSelector = (state: UsersStateModel) => state.users;

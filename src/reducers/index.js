import { combineReducers } from 'redux';

import { authentication } from './auth.reducer';
import { registration } from './register.reducer';
import { users } from './user.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export default rootReducer;
import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';

import Auth from './auth';

export default {
  Reducers: combineReducers({
    auth: Auth.Reducer,
  }),
  *Sagas() {
    return yield all([Auth.Sagas]);
  },
};

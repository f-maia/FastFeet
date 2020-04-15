import produce from 'immer';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

const Types = {
  SIGN_IN_REQUEST: '@auth/SING_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SING_IN_SUCCESS',
  SIGN_IN_FAILURE: '@auth/SIGN_IN_FAILURE',
  SIGN_OUT: '@auth/SIGN_OUT',
};

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  user: null,
};

const Reducer = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case Types.SIGN_IN_REQUEST: {
        draft.loading = true;
        break;
      }
      case Types.SIGN_IN_SUCCESS: {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        draft.user = action.payload.user;
        break;
      }
      case Types.SIGN_IN_FAILURE: {
        draft.loading = false;
        break;
      }
      case Types.SIGN_OUT: {
        draft.token = null;
        draft.signed = false;
        draft.user = null;
        break;
      }
      default:
    }
  });
};

export const Actions = {
  signInRequest: (email, password) => {
    return {
      type: Types.SIGN_IN_REQUEST,
      payload: { email, password },
    };
  },

  signInSuccess: (token, user) => {
    return {
      type: Types.SIGN_IN_SUCCESS,
      payload: { token, user },
    };
  },

  signFailure: () => {
    return {
      type: Types.SIGN_IN_FAILURE,
    };
  },

  signOut: () => {
    return {
      type: Types.SIGN_OUT,
    };
  },
};

const Sagas = {
  *signIn({ payload }) {
    try {
      const { email, password } = payload;

      const response = yield call(api.post, 'sessions', {
        email,
        password,
      });

      const { token, user } = response.data;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(Actions.signInSuccess(token, user));

      history.push('/orders');
    } catch (err) {
      toast.error('Falha na autenticação, verifique seus dados!');
      yield put(Actions.signFailure());
    }
  },

  setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    }
  },

  signOut() {
    history.push('/');
  },
};

export default {
  Reducer,
  Sagas: all([
    takeLatest('persist/REHYDRATE', Sagas.setToken),
    takeLatest(Types.SIGN_IN_REQUEST, Sagas.signIn),
    takeLatest(Types.SIGN_OUT, Sagas.signOut),
  ]),
};

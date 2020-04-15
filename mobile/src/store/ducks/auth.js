import produce from 'immer';
import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import formatDate from '~/utils/formatDate';

const Types = {
  SIGN_IN_REQUEST: '@auth/SING_IN_REQUEST',
  SIGN_IN_SUCCESS: '@auth/SING_IN_SUCCESS',
  SIGN_IN_FAILURE: '@auth/SIGN_IN_FAILURE',
  SIGN_OUT: '@auth/SIGN_OUT',
};

const INITIAL_STATE = {
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
        draft.signed = false;
        draft.user = null;
        break;
      }
      default:
    }
  });
};

export const Actions = {
  signInRequest: (id) => {
    return {
      type: Types.SIGN_IN_REQUEST,
      payload: { id },
    };
  },

  signInSuccess: (user) => {
    return {
      type: Types.SIGN_IN_SUCCESS,
      payload: { user },
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
      const { id } = payload;

      const response = yield call(api.get, `deliverers/${id}`);
      const user = response.data;

      if (!user.id) {
        Alert.alert('Erro no login', 'Entregador não encontrado');
        yield put(Actions.signFailure());
        return;
      }

      const userFormatted = {
        ...user,
        created_at: formatDate(user.created_at),
      };

      yield put(Actions.signInSuccess(userFormatted));
    } catch (err) {
      Alert.alert(
        'Falha na autenticação',
        'Houve um erro no login, verifique seus dados'
      );
      yield put(Actions.signFailure());
    }
  },

  setUser({ payload }) {
    if (!payload) return;

    const { user } = payload.auth;
    if (!user) return;

    put(Actions.signInSuccess(user));
  },
};

export default {
  Reducer,
  Sagas: all([
    takeLatest('persist/REHYDRATE', Sagas.setUser),
    takeLatest(Types.SIGN_IN_REQUEST, Sagas.signIn),
  ]),
};

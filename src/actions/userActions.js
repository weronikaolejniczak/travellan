import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAIN_FIREBASE_API } from 'react-native-dotenv';

export const AUTHENTICATE = 'AUTHENTICATE';

const API_KEY = MAIN_FIREBASE_API;

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const signUpRequest = (email, password) => {
  return async function (dispatch) {
    await axios({
      method: 'POST',
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      data: {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    })
      .then((res) => res.data)
      .then((data) => {
        const expirationDate = new Date(
          new Date().getTime() + parseInt(data.expiresIn, 10) * 1000,
        );
        dispatch(authenticate(data.localId, data.idToken));
        saveDataToStorage(data.idToken, data.localId, expirationDate);
      })
      .catch(() => {
        let message = 'Something went wrong!';
        throw new Error(message);
      });
  };
};

export const loginRequest = (email, password) => {
  return async function (dispatch) {
    await axios({
      method: 'POST',
      url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      data: {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    })
      .then((res) => res.data)
      .then((data) => {
        const expirationDate = new Date(
          new Date().getTime() + parseInt(data.expiresIn, 10) * 1000,
        );
        dispatch(authenticate(data.localId, data.idToken));
        saveDataToStorage(data.idToken, data.localId, expirationDate);
      })
      .catch((err) => {
        const message = 'Email or password are incorrect. Please try again.';
        console.log(err);
        throw new Error(message);
      });
  };
};

export const logout = () => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: '',
    }),
  );
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};

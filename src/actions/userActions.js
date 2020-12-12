import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MAIN_FIREBASE_API} from 'react-native-dotenv';

export const AUTHENTICATE = 'AUTHENTICATE';

const API_KEY = MAIN_FIREBASE_API;

export const authenticate = (userId, token) => {
  return {type: AUTHENTICATE, userId: userId, token: token};
};

export const signUpRequest = (email, password) => {
  return async (dispatch) => {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_EXISTS') {
        message = "Email isn't correct!";
      }

      throw new Error(message);
    }
    const data = await response.json();
    dispatch(authenticate(data.localId, data.idToken));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn, 10) * 1000,
    );
    saveDataToStorage(data.idToken, data.localId, expirationDate);
  };
};

export const loginRequest = (email, password) => {
  return async (dispatch) => {
    const response = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'Something went wrong. Try Again';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Something went wrong. Try Again';
      }

      throw new Error(message);
    }

    const data = await response.json();
    dispatch(authenticate(data.localId, data.idToken));

    const expirationDate = new Date(
      new Date().getTime() + parseInt(data.expiresIn, 10) * 1000,
    );
    saveDataToStorage(data.idToken, data.localId, expirationDate);
  };
};

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

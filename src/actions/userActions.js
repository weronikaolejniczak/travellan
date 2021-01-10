import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { AUTH_URL } from 'react-native-dotenv';

export const AUTHENTICATE = 'AUTHENTICATE';

const URL = AUTH_URL;

export const authenticate = (userId, token) => {
  return { token: token, type: AUTHENTICATE, userId: userId };
};

export const signUpRequest = (email, password) => {
  return async function (dispatch) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          const message = 'That email address is invalid!';
          throw new Error(message);
        }

        if (error.code === 'auth/invalid-email') {
          const message = 'That email address is invalid!';
          throw new Error(message);
        }
      });
  };
};

export const loginRequest = (email, password) => {
  return async function (dispatch) {
    await axios({
      data: {
        email: email,
        password: password,
        returnSecureToken: true,
      },
      method: 'POST',
      url: URL,
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
        throw new Error('Something went wrong. Try again');
      });
    auth().signInWithEmailAndPassword(email, password);
  };
};

export const logout = () => {
  auth().signOut();
  AsyncStorage.removeItem('userData');
};

export const sendResetEmail = (email) => {
  return async function (dispatch) {
    auth().sendPasswordResetEmail(email);
  };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      expiryDate: expirationDate.toISOString(),
      token: token,
      userId: userId,
    }),
  );
};

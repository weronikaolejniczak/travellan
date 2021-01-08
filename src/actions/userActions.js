import axios from 'axios';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAIN_FIREBASE_API } from 'react-native-dotenv';

export const AUTHENTICATE = 'AUTHENTICATE';

const API_KEY = MAIN_FIREBASE_API;

export const authenticate = (userId, token) => {
  return { token: token, type: AUTHENTICATE, userId: userId };
};

export const signUpRequest = (email, password) => {
  return async function (dispatch) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        //console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          const message = 'That email address is already in use!'
          throw new Error(message);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          const message = 'That email address is invalid!'
          throw new Error(message);
        }
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
        //const message = 'Email or password are incorrect. Please try again.';
        //console.log(err);
        throw new Error(err);
      });
  };
};


export const logout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
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

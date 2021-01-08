import axios from 'axios';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAIN_FIREBASE_API } from 'react-native-dotenv';

export const AUTHENTICATE = 'AUTHENTICATE';

//const API_KEY = MAIN_FIREBASE_API;

export const authenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token };
};

export const signUpRequest = (email, password) => {
  return async function (dispatch) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });

    /**await axios({
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
      */
  };
};

export const loginRequest = (email, password) => {
  return async function (dispatch) {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password)
      if (response && response.user) {
        console.log('Signed In');
      }
    } catch (e) {
      console.error(e.message)
    }
   /**  await axios({
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
      */
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
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};

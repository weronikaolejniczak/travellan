import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { AUTH_URL, WEB_CLIENT_ID } from 'react-native-dotenv';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

export const AUTHENTICATE = 'AUTHENTICATE';

const URL = AUTH_URL;
const CLIENT_ID = WEB_CLIENT_ID;

export const authenticate = (userId, token) => {
  return { token: token, type: AUTHENTICATE, userId: userId };
};

export const signUpRequest = (email, password) => {
  return async function (dispatch) {
    await auth()
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
    const user = auth().currentUser;
    const localId = user.uid;
    await user.getIdToken().then(function (idToken) {
      const expirationDate = new Date(new Date().getTime() + 59 * 60 * 1000);
      dispatch(authenticate(localId, idToken));
      saveDataToStorage(idToken, localId, expirationDate);
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

export const sendResetEmail = (email) =>
  async function (dispatch) {
    auth().sendPasswordResetEmail(email);
  };

export const onFacebookButtonPress = () => {
  return async function (dispatch) {
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    await auth().signInWithCredential(facebookCredential);
    const user = auth().currentUser;
    const localId = user.uid;
    await user.getIdToken().then(function (idToken) {
      const expirationDate = new Date(new Date().getTime() + 59 * 60 * 1000);
      dispatch(authenticate(localId, idToken));
      saveDataToStorage(idToken, localId, expirationDate);
    });
  };
};

export const onGoogleButtonPress = () => {
  return async function (dispatch) {
    GoogleSignin.configure({
      webClientId: CLIENT_ID,
    });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    const user = auth().currentUser;
    const localId = user.uid;
    await user.getIdToken().then(function (idToken) {
      const expirationDate = new Date(new Date().getTime() + 59 * 60 * 1000);
      dispatch(authenticate(localId, idToken));
      saveDataToStorage(idToken, localId, expirationDate);
    });
  };
};

const saveDataToStorage = (token, userId, expirationDate) =>
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      expiryDate: expirationDate.toISOString(),
      token: token,
      userId: userId,
    }),
  );

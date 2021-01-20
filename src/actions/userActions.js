import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { AUTH_URL, AUTH_URL_SOCIAL, WEB_CLIENT_ID } from 'react-native-dotenv';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';

export const AUTHENTICATE = 'AUTHENTICATE';

const URL = AUTH_URL;
const URL_SOCIAL = AUTH_URL_SOCIAL;
const CLIENT_ID = WEB_CLIENT_ID;

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
        console.log(data.localId);
        console.log(data.idToken);
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

export async function onFacebookButtonPress() {
  // attempt login with permissions
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
  return auth().signInWithCredential(facebookCredential);
}

export const onGoogleButtonPress = () => {
  return async function (dispatch) {
    GoogleSignin.configure({
      webClientId: CLIENT_ID,
    });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth().signInWithCredential(googleCredential);
    const user = auth().currentUser;
    const localId = user.uid;
    const expirationDate = new Date(new Date().getTime() + 59 * 60 * 1000);
    dispatch(authenticate(localId, idToken));
    saveDataToStorage(idToken, user.uid, expirationDate);

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

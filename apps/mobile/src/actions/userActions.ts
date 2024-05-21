import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { Dispatch } from 'redux';

export const AUTHENTICATE = 'AUTHENTICATE';

const CLIENT_ID = Config.FIREBASE_CLIENT_ID;

export interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  token: string;
  userId: string;
}

export type AuthActionTypes = AuthenticateAction;

const isFirebaseAuthError = (
  error: unknown,
): error is FirebaseAuthTypes.NativeFirebaseAuthError => {
  return (
    error instanceof Error &&
    (error as FirebaseAuthTypes.NativeFirebaseAuthError).code !== undefined
  );
};

export const authenticate = (
  userId: string,
  token: string,
): AuthenticateAction => {
  return { type: AUTHENTICATE, token, userId };
};

export const signUpRequest = (email: string, password: string) => {
  return async function (dispatch: Dispatch<AuthActionTypes>) {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const user = auth().currentUser;
      if (user) {
        const localId = user.uid;
        const idToken = await user.getIdToken();
        const expirationDate = new Date(new Date().getTime() + 59 * 60 * 1000);

        dispatch(authenticate(localId, idToken));
        saveDataToStorage(idToken, localId, expirationDate);
      }
    } catch (error: unknown) {
      if (isFirebaseAuthError(error)) {
        if (
          error.code === 'auth/email-already-in-use' ||
          error.code === 'auth/invalid-email'
        ) {
          throw new Error('That email address is invalid!');
        } else {
          throw error;
        }
      } else {
        throw new Error('Unknown error occurred during sign-up.');
      }
    }
  };
};

export const loginRequest = (email: string, password: string) => {
  return async function (dispatch: Dispatch<AuthActionTypes>) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      const localId = user.uid;
      const expirationDate = new Date(new Date().getTime() + 59 * 60 * 1000);

      dispatch(authenticate(localId, idToken));
      saveDataToStorage(idToken, localId, expirationDate);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Something went wrong. Try again');
      }
    }
  };
};

export const logout = () => {
  auth().signOut();
  AsyncStorage.removeItem('userData');
};

export const sendResetEmail = (email: string) => {
  return async function () {
    await auth().sendPasswordResetEmail(email);
  };
};

export const onFacebookButtonPress = () => {
  return async function (dispatch: Dispatch<AuthActionTypes>) {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      await auth().signInWithCredential(facebookCredential);

      const user = auth().currentUser;

      if (user) {
        const localId = user.uid;
        const idToken = await user.getIdToken();
        const expirationDate = new Date(new Date().getTime() + 59 * 60 * 1000);
        dispatch(authenticate(localId, idToken));
        saveDataToStorage(idToken, localId, expirationDate);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error occurred during Facebook sign-in.');
      }
    }
  };
};

export const onGoogleButtonPress = () => {
  return async function (dispatch: Dispatch<AuthActionTypes>) {
    try {
      GoogleSignin.configure({
        webClientId: CLIENT_ID,
      });

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);

      const user = auth().currentUser;

      if (user) {
        const localId = user.uid;
        const idToken = await user.getIdToken();
        const expirationDate = new Date(new Date().getTime() + 59 * 60 * 1000);
        dispatch(authenticate(localId, idToken));
        saveDataToStorage(idToken, localId, expirationDate);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('Unknown error occurred during Google sign-in.');
      }
    }
  };
};

const saveDataToStorage = (
  token: string,
  userId: string,
  expirationDate: Date,
) =>
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      expiryDate: expirationDate.toISOString(),
      token,
      userId,
    }),
  );

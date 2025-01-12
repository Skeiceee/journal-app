/* eslint-disable no-unused-vars */
import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../firebase/provider";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    console.log(result.ok);
    if (!result.ok) {
      return dispatch(logout(result.message));
    }

    dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({ email, password, name}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailPassword({
      email,
      password,
      name,
    });

    if (!result.ok) {
      return dispatch(logout(result.message));
    }

    dispatch(login(result));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailPassword({ email, password });
    
    if (!result.ok) {
      return dispatch(logout(result.message));
    }

    dispatch(login(result));
  };
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(logout())
  }
}
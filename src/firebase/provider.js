import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'})

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    // const credentials = GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;
    console.log(result.user);
    
    return {
        ok:true,
        displayName,
        email,
        photoURL,
        uid,
    }

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return{
        ok: false,
        code: errorCode,
        message: errorMessage,
    }
  }
};

export const registerUserWithEmailPassword = async ({ email, password, name }) => {
  try {
    const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const { uid, photoURL } = resp.user;

    await updateProfile( FirebaseAuth.currentUser, {
      displayName: name,
    })

    return {
      ok: true,
      displayName: name,
      email,
      photoURL,
      uid,
    }

  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return{
        ok: false,
        code: errorCode,
        message: errorMessage,
    }
  } 
}


export const loginWithEmailPassword = async ({ email, password }) => {

  try {
    
    const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL, displayName } = resp.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }

  }catch (error){

    const errorCode = error.code;
    const errorMessage = error.message;
    return{
        ok: false,
        code: errorCode,
        message: errorMessage,
    }
    
  }

}


export const logoutFirebase = async() => {
  return await FirebaseAuth.signOut();
}
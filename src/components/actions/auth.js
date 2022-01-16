import { getAuth, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

export const startLoginEmailPass = (email, password) => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user: userCredential }) => {
                console.log(userCredential);
                dispatch(login(userCredential.uid, userCredential.displayName));
            })
            .catch(e => {
                console.log(e);
            });
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user: userCredentials }) => {
                console.log(userCredentials);
                dispatch(login(userCredentials.uid, userCredentials.displayName))
            });
    }
};

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user: userCredential }) => {
                await updateProfile(userCredential, { displayName: name });
                dispatch(login(userCredential.uid, userCredential.displayName));
            })
            .catch(e => {
                console.log(e);
            });
    }
};

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
};
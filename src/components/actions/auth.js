import { getAuth, signInWithPopup } from 'firebase/auth';
import { googleAuthProvider } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

export const startLoginEmailPass = (email, password) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(login(123, 'Juan'));
        }, 3500);
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user: userCredentials }) => {
                console.log(userCredentials);
                dispatch(login(userCredentials.uid, userCredentials.displayName))
            });
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
};
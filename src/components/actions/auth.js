import {
    getAuth,
   signOut,
   signInWithEmailAndPassword,
   signInWithPopup,
   createUserWithEmailAndPassword,
   updateProfile
} from 'firebase/auth';
import { googleAuthProvider } from '../../firebase/firebaseConfig';
import Swal from 'sweetalert2';

import { types } from '../../types/types';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPass = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());

        const auth = getAuth();

        return signInWithEmailAndPassword(auth, email, password)
            .then(({ user: userCredential }) => {
                // console.log(userCredential);
                dispatch(login(userCredential.uid, userCredential.displayName));

                dispatch(finishLoading());
            })
            .catch(e => {
                console.log(e);
                dispatch(finishLoading());
                Swal.fire('Error',e.message,'error');
            });
    }
};

export const startGoogleLogin = () => {
    return (dispatch) => {
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({ user: userCredentials }) => {
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
                Swal.fire('Error',e.message,'error');
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

export const startLogout = () => {
    const auth = getAuth();
    signOut(auth);

    return (dispatch) => {
        dispatch(logout());
        dispatch(noteLogout());
    }
}

export const logout = () => ({
    type: types.logout
})
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyAe3FLVJ0d-0BBw5kwD_6Bfrz_ySxGCc6A",
        authDomain: "crown-db-9ee0b.firebaseapp.com",
        databaseURL: "https://crown-db-9ee0b.firebaseio.com",
        projectId: "crown-db-9ee0b",
        storageBucket: "crown-db-9ee0b.appspot.com",
        messagingSenderId: "165687828593",
        appId: "1:165687828593:web:879c4ac2d61623940afbd0",
        measurementId: "G-X2VV5P0HG6"
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

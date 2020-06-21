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
export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const{displayName,email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,email,createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user',error)
        }
    }
    return userRef;
     
}
firebase.initializeApp(config);
export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,obj);
    });
    return await batch.commit()
}
export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title,items} = doc.data();
        return {
            routeName: encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
} 
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;

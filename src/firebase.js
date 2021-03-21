import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyAQG1ks7N_A9AaDtI1Wl1fmVERBzzTe-fI",
    authDomain: "think-piece-ef017.firebaseapp.com",
    projectId: "think-piece-ef017",
    storageBucket: "think-piece-ef017.appspot.com",
    messagingSenderId: "514461317964",
    appId: "1:514461317964:web:8254919f957bf080cdade9",
    measurementId: "G-X9QE0048NC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.firebase = firebase

export const firestore = firebase.firestore()
export const auth = firebase.auth()
export const signOut = () => auth.signOut()
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (user, additionalData = {}) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`)
    const snapshot = userRef.get()
    if (!snapshot.exists) {
        const { displayName, email, photoURL } = user
        console.log('displayName, email, photoURL:', displayName, email, photoURL)
        const createdAt = new Date()
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                photoURL,
                ...additionalData

            })
        } catch (error) {
            console.log('error:', error)
            console.error('Error creating user', error)

        }

    }
    return getUserDocument(user.uid)


}
export const getUserDocument = async (uid) => {
    if (!uid) return null
    try {
        const userDoc = await firestore.doc(`users/${uid}`).get()
        console.log('userDoc:', userDoc)
        return { uid, ...userDoc.data() }
    } catch (error) {
        console.log('error:', error)
        console.error('Error getting user', error)

    }

}

export { firebase };
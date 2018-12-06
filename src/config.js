export const firebase = {
    apiKey: "AIzaSyA5STvrKUZQyr9wwIe-qV-9wMhICuvwyT0",
    authDomain: "cockpit-fromage-blanc.firebaseapp.com",
    databaseURL: "https://cockpit-fromage-blanc.firebaseio.com",
    projectId: "cockpit-fromage-blanc",
    storageBucket: "cockpit-fromage-blanc.appspot.com",
    messagingSenderId: "843904323630"
};


export const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
    enableLogging: false
};

export default {firebase, rrfConfig}

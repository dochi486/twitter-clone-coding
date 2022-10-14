import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAKBAH3aMRK_Qi_ogwfDI4ECSQJBgyH8Pg',
  authDomain: 'twitter-clone-code.firebaseapp.com',
  projectId: 'twitter-clone-code',
  storageBucket: 'twitter-clone-code.appspot.com',
  messagingSenderId: '742948036950',
  appId: '1:742948036950:web:9fe193a4f18a835631b6f7',
};
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();

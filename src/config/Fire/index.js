import {initializeApp} from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBMw1qO5icZRzP9jbTYureQechWystllaI',
  authDomain: 'my-doctor-01-840e0.firebaseapp.com',
  projectId: 'my-doctor-01-840e0',
  storageBucket: 'my-doctor-01-840e0.appspot.com',
  messagingSenderId: '429348084279',
  appId: '1:429348084279:web:7154a5e8a94a1cd4893db2',
};

// Initialize Firebase
const Fire = initializeApp(firebaseConfig);

export default Fire;

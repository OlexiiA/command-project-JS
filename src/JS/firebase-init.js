// // Import the functions you need from the SDKs you need
// import * as firebase from 'firebase/app';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// import { getApp, getAuth, onAuthStateChanged } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyBXxoPSeNW5EFesWhzaR6GiFVqeFME23bI',
//   authDomain: 'filmoteka-firebase.firebaseapp.com',
//   databaseURL:
//     'https://filmoteka-firebase-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'filmoteka-firebase',
//   storageBucket: 'filmoteka-firebase.appspot.com',
//   messagingSenderId: '164969956300',
//   appId: '1:164969956300:web:7d63858d1779337f851369',
// };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// console.log('firebase:', firebase);

// // const fb = firebase.database();
// console.log('app:', app);

// const auth = getAuth(FirebaseApp);
// const db = getFirestore(FirebaseApp);




// import { initializeApp } from 'firebase/app';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import {  getFirestore, collection, getDocs} from 'firebase/firestore';

// const firebaseApp = initializeApp({
//   apiKey: 'AIzaSyBXxoPSeNW5EFesWhzaR6GiFVqeFME23bI',
//   authDomain: 'filmoteka-firebase.firebaseapp.com',
//   databaseURL:
//     'https://filmoteka-firebase-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'filmoteka-firebase',
//   storageBucket: 'filmoteka-firebase.appspot.com',
//   messagingSenderId: '164969956300',
//   appId: '1:164969956300:web:7d63858d1779337f851369',
// });

// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyBXxoPSeNW5EFesWhzaR6GiFVqeFME23bI',
//   authDomain: 'filmoteka-firebase.firebaseapp.com',
//   databaseURL:
//     'https://filmoteka-firebase-default-rtdb.europe-west1.firebasedatabase.app',
//   projectId: 'filmoteka-firebase',
//   storageBucket: 'filmoteka-firebase.appspot.com',
//   messagingSenderId: '164969956300',
//   appId: '1:164969956300:web:7d63858d1779337f851369',
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(firebaseApp);
// const db = getFirestore(firebaseApp);
// db.collection('todos').getDocs();
// const todosCol = collection(db, 'todos');
// const spapshot = await getDocs(todosCol);

// Detect auth state
// auth.onAuthStateChanged(user => {});

// onAuthStateChanged(auth, user => {
//   if (user != null) {
//     console.log('logged in!');
//   } else {
//     console.log('No user');
//   }
// });

// var messagesRef = firebase.database().ref('messages');

// document.getElementById('contactForm').addEventListener('submit', submitForm);

// function submitForm(e) {
//   e.preventDefault();

//   console.log('13234');

//   var email = getInputVal('email');
//   var password = getInputVal('password');

//   //   console.log(email);
//   //     console.log(password);

//   saveMessage(email, password);
// }

// function getInputVal(id) {
//   return document.getElementById(id).value;
// }

// function saveMessage(email, password) {
//   var newMessageRef = messagesRef.push();
//   newMessageRef.set({
//     email: email,
//     password: password,
//   });
//   console.log(newMessageRef);
// }

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-opens]'),
    closeModalBtn: document.querySelector('[data-modal-closes]'),
    modal: document.querySelector('[data-modals]'),
    body: document.querySelector('[data-bodys]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle('is-hiddens');
    refs.body.classList.toggle('no-scrolls');
  }
})();

(() => {
  const menuBtnRef = document.querySelector('[data-menu-buttons]');
  const mobileMenuRef = document.querySelector('[data-menus]');
  const body = document.querySelector('[data-bodys]');

  menuBtnRef.addEventListener('click', () => {
    const expanded =
      menuBtnRef.getAttribute('aria-expanded') === 'true' || false;

    menuBtnRef.classList.toggle('is-opens');
    menuBtnRef.setAttribute('aria-expanded', !expanded);

    mobileMenuRef.classList.toggle('is-opens');
    body.classList.toggle('no-scrolls');
  });
})();

const form = document.querySelector('form.login-form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formElements = event.currentTarget.elements;
  const email = formElements.email.value;
  const password = formElements.password.value;

  if (email === '' || password === '') {
    alert('всі поля повинні бути заповнені');
  } else {
    const formData = {
      email,
      password,
    };

    console.log(formData);
    form.reset();
  }
}

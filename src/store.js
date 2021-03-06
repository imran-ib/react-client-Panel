// install firebase firestore react-redux-firebase redux-firestore

import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import firebase from "firebase";
import "firebase/firestore";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// reducers
import notifyReducer from "./components/reucers/notityReducer";
import settingsReducers from "./components/reucers/settingsReducers";

const firebaseConfig = {
  apiKey: "AIzaSyC92I-wj5N28_WeFK4c5NLrDd-rz08p3xw",
  authDomain: "client-panel-7ebaa.firebaseapp.com",
  databaseURL: "https://client-panel-7ebaa.firebaseio.com",
  projectId: "client-panel-7ebaa",
  storageBucket: "client-panel-7ebaa.appspot.com",
  messagingSenderId: "431263273378"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
//const firestore = firebase.firestore(); // <- needed if using firestore
const firestore = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);
// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducers
});

// check if settings are already stored in local storage

if (localStorage.getItem("settings") === null) {
  // default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  //set local storage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create store with reducers and initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };
// store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

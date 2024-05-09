// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// export const firebaseConfig = {
//   apiKey: "AIzaSyBR5zStqqWecJ2me598rsYdCCO3stG_Jzk",
//   authDomain: "multi-game-20a3e.firebaseapp.com",
//   projectId: "multi-game-20a3e",
//   storageBucket: "multi-game-20a3e.appspot.com",
//   messagingSenderId: "395226060988",
//   appId: "1:395226060988:web:d12801c2ab8a213ead98b9",
//   measurementId: "G-Q447TGYR1T",
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// import { initializeApp } from "@react-native-firebase/app";

// import * as firebase from "firebase";
// const firebaseConfig = {
//   apiKey: "AIzaSyBR5zStqqWecJ2me598rsYdCCO3stG_Jzk",
//   authDomain: "multi-game-20a3e.firebaseapp.com",
//   projectId: "multi-game-20a3e",
//   storageBucket: "multi-game-20a3e.appspot.com",
//   messagingSenderId: "395226060988",
//   appId: "1:395226060988:web:d12801c2ab8a213ead98b9",
//   measurementId: "G-Q447TGYR1T",
// };

// firebase.initializeApp(firebaseConfig);

import { initializeApp } from "@react-native-firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBR5zStqqWecJ2me598rsYdCCO3stG_Jzk",
  authDomain: "multi-game-20a3e.firebaseapp.com",
  projectId: "multi-game-20a3e",
  storageBucket: "multi-game-20a3e.appspot.com",
  messagingSenderId: "395226060988",
  appId: "1:395226060988:web:d12801c2ab8a213ead98b9",
  measurementId: "G-Q447TGYR1T",
};
initializeApp(firebaseConfig);

const BASE_URL = "https://multigames.azurewebsites.net/api";
// const BASE_URL = "http://10.0.146.180:3000/api"

export { BASE_URL };

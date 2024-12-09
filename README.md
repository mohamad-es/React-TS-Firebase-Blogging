# React + TypeScript + Vite + Firebase

❗❗ Please attention

this template works with Firebase; you must set up your Firebase first.

I will show you how to configure this app with your Firebase config. (these steps are for those who know the Firebase and Firestore Database)


- step 1
  create a collection named ###blogs###, and this collection must have these fields:  1_userId 2_content 3_title

- step 2
  create a folder in the root of direction in src folder name **config** and create new file name firebaseConfig.ts

- step 3
  your firebaseConfig.ts must be look like this:

  ```ts
  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
  apiKey: "your API key",
  authDomain: "your authDomain",
  projectId: "your projectId",
  storageBucket: "your storageBucket",
  messagingSenderId: "your messagingSenderId",
  appId: "your appId",
  measurementId: "your measurementId",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);
  ```

- step 4
  install node_modules with ```npm i``` and start your developement with ```npm run dev```

easy as heaven.

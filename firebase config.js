// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAVtttI3Vuj--_UNygVBRHR59iYjMogXM",
  authDomain: "tdesigns-254.firebaseapp.com",
  projectId: "tdesigns-254",
  storageBucket: "tdesigns-254.firebasestorage.app",
  messagingSenderId: "692570640490",
  appId: "1:692570640490:web:cb9489d2f50d7bd9b7fa13",
  measurementId: "G-K6CNE88GHW"
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log("✅ Firebase initialized successfully");
} catch (error) {
    console.error("❌ Error initializing Firebase:", error);
}

// Initialize Firestore
const db = firebase.firestore();

// Enable debug logging (helpful for troubleshooting)
firebase.firestore.setLogLevel('debug');
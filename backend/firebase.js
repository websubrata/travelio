const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// ── Firebase Web Config (hardcoded as requested) ─────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyDiiF9FEYsVOtCi3AAffbF-f5D8tBvUj80",
  authDomain: "travelio-29221.firebaseapp.com",
  projectId: "travelio-29221",
  storageBucket: "travelio-29221.firebasestorage.app",
  messagingSenderId: "313313089917",
  appId: "1:313313089917:web:a2fe2bcd404f6418275414",
  measurementId: "G-S3RGF5DS2D",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db };

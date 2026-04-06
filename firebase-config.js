// Firebase Configuration and Initialization
// Uses ENV configuration from env.js

// Firebase Configuration Object from env.js
const firebaseConfig = {
    apiKey: ENV.FIREBASE.apiKey,
    authDomain: ENV.FIREBASE.authDomain,
    projectId: ENV.FIREBASE.projectId,
    storageBucket: ENV.FIREBASE.storageBucket,
    messagingSenderId: ENV.FIREBASE.messagingSenderId,
    appId: ENV.FIREBASE.appId,
    measurementId: ENV.FIREBASE.measurementId
};

// Initialize Firebase when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Firebase is available
    if (typeof firebase !== 'undefined') {
        // Initialize Firebase App
        const app = firebase.initializeApp(firebaseConfig);
        
        // Initialize Firebase services
        const db = firebase.firestore();
        
        console.log('Firebase initialized successfully!');
        
        // Make Firebase services available globally
        window.firebaseApp = app;
        window.firebaseDB = db;
        window.firebase = firebase; // Expose firebase object for FieldValue
        
        // Dispatch custom event for other scripts
        document.dispatchEvent(new CustomEvent('firebaseReady', {
            detail: { app, db }
        }));
    } else {
        console.error('Firebase SDK not loaded. Please check script tags.');
    }
});

// Helper function to check if Firebase is ready
function isFirebaseReady() {
    return typeof firebase !== 'undefined' && firebase.apps.length > 0;
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { firebaseConfig, isFirebaseReady };
}

// Environment Configuration for Firebase
// This file contains Firebase configuration and environment settings

const ENV = {
    // Firebase Configuration
    FIREBASE: {
        apiKey: "AIzaSyDxhFUw3lfzNsG7eCM8RpkqQs4qRpEhjtM",
        authDomain: "sheran-notary.firebaseapp.com",
        projectId: "sheran-notary",
        storageBucket: "sheran-notary.firebasestorage.app",
        messagingSenderId: "332365962204",
        appId: "1:332365962204:web:7ab06b616970dd965ccd19",
        measurementId: "G-6SZ48S7N0C"
    },
    
    // Application Settings
    APP: {
        NAME: "Sharan Thind Notary Public",
        VERSION: "1.0.0",
        ENVIRONMENT: "production"
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ENV;
}

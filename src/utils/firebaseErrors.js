// Error messages that appear from the firebase end while trying to signup or signin
export const getFirebaseErrorMessage = (code) => {
  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Try logging in.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before finishing.';
    case 'auth/cancelled-popup-request':
      return 'Sign-in was interrupted. Try again.';
    case 'auth/invalid-credential':
      return 'Your login credentials are invalid. Please check your email and password.';
    default:
      return 'Something went wrong. Please try again.';
  }
};

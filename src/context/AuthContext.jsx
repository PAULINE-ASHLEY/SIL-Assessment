import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth';
import { app } from '../firebase';

// Creates Authentication Context for global state management
const AuthContext = createContext();

// AuthProvider component
export function AuthProvider({ children }) {
  const auth = getAuth(app);

  // State for current authenticated user and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initializes authentication providers for social login
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // Email/Password Authentication Methods

  // Sign up new user with email and password
  const signupWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Log in existing user with email and password
  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Social Authentication Methods

  // Sign in using Google authentication popup
  const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

  // Sign in using GitHub authentication popup
  const loginWithGithub = () => signInWithPopup(auth, githubProvider);

  // Log out current user
  const logout = () => signOut(auth);

  // Effect hook to track authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    // Provides authentication state and methods to child components via Context
    <AuthContext.Provider
      value={{
        user,
        loading,
        signupWithEmail,
        loginWithEmail,
        loginWithGoogle,
        loginWithGithub,
        logout,
      }}
    >
      {children} {/* Render child components */}
    </AuthContext.Provider>
  );
}

// Custom hook to easily access authentication context in components
export const useAuth = () => useContext(AuthContext);

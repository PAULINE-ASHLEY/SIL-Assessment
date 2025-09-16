import { createContext, useContext, useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  getRedirectResult, // Add this import
  setPersistence, // Add this import
  browserLocalPersistence, // Add this import
} from 'firebase/auth';
import { app } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        // Check if we're returning from a redirect
        const result = await getRedirectResult(auth);
        if (result) {
          console.log('Redirect result:', result.user);
        }
      } catch (error) {
        console.error('Redirect result error:', error);
      }
    };

    checkRedirectResult();

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

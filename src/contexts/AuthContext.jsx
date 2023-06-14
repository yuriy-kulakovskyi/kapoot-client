import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // loading state
  const [loading, setLoading] = useState(true);

  // signup function
  const signup = (auth, email, password) => createUserWithEmailAndPassword(auth, email, password);

  // login function
  const login = (auth, email, password) => signInWithEmailAndPassword(auth, email, password);

  // logout function
  const logout = () => signOut(auth);

  // updateProfile function
  const updateprofile = (auth, user, profile) => updateProfile(auth, user, profile);

  // useEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    updateprofile,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  );
}
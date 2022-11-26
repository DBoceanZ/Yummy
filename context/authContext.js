import React, { useState, useEffect, useContext } from "react";
import { auth } from "../config/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [globalUsername, setGlobalUsername] = useState();

  const signup = async (email, password, userType) => {
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      console.log("user:", user);
      let currUser = user.user;
      let response = {
        email: currUser.email,
        firebaseId: currUser.uid,
        userType: userType,
      };
      setCurrentUser(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (email, password) => {
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      console.log("userLogin:", user);
      let currUser = user.user;
      let response = {
        email: currUser.email,
        firebaseId: currUser.uid,
      };
      setCurrentUser(response);
      return response;
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateUserEmail = (email) => {
    return updateEmail(currentUser, email);
  };

  const updateUserPassword = (password) => {
    return updatePassword(currentUser, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateUserEmail,
    updateUserPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

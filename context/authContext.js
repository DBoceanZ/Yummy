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

  const signup = (email, password, userType) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        let currUser = user.user;
        let response = {
          email: currUser.email,
          firebaseId: currUser.uid,
          userType: userType,
        };
        setCurrentUser(response);
      })
      .catch(console.log);
  };

  const login = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        let currUser = user.user;
        let response = {
          email: currUser.email,
          firebaseId: currUser.uid,
        };
        setCurrentUser(response);
        console.log(response);
      })
      .catch(console.log);
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

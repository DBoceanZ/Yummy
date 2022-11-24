import React, { useState, useEffect, useContext, createContext } from "react";

const userPackage = {
  userName: "",
  UID: "",
  userEmail: "",
  userToken: "",
};
const GlobalContext = createContext();

export function Context({ children }) {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(userPackage);

  const values = {
    userData,
    setUserData,
    state,
    setState,
    loading,
    setLoading,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("!!Must use within Global context!!");
  }
  return context;
}

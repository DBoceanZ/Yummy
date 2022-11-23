import React, { useState, useEffect, useContext, createContext } from "react";

const GlobalContext = createContext();

export function Context({ children }) {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  const values = {
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

import React, { useState, useEffect, useContext, createContext } from "react";

const userPackage = {
  username: "",
  UID: "",
  userEmail: "",
  userToken: "",
  profile_photo: "",
  selectedUserID: "",
};

const videos = {
  videos: [],
  index: 0
};

const GlobalContext = createContext();

export function Context({ children }) {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(userPackage);
  const [homeVideos, setHomeVideos] = useState(videos);

  // from Register:
  // axios.post new user --> then get UID and username from db
  // setUserData.UID and username

  // from Login:
  // axios.get user by firebaseID --> return username and UID
  // setUserData.uid & username

  const values = {
    userData,
    setUserData,
    state,
    setState,
    loading,
    setLoading,
    homeVideos,
    setHomeVideos
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

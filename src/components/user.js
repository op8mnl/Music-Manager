import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./userContext.js";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./firebase.js";

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        console.log(user);
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

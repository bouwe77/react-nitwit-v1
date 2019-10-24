import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthProvider";

/**
 * The UserContext handles context regarding the currently logged in user.
 */
const UserContext = createContext();

/**
 * The UserProvider is the provider for the UserContext.
 * It provides means of holding data of the logged in user.
 */
function UserProvider(props) {
  const {
    data: { user }
  } = useAuth();
  return <UserContext.Provider value={user} {...props} />;
}

/**
 * The useUser hook exposes the UserProvider.
 */
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUser };

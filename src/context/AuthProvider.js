// import React, { createContext, useContext } from "react";

// /**
//  * The AuthContext is a context regarding authentication related functionality.
//  */
// const AuthContext = createContext();

// /**
//  * The AuthProvider is the provider for the AuthContext.
//  * It provides means of holding data of the logged in user and functions for logging in or out.
//  */
// function AuthProvider(props) {
//   const data = { user: {} };
//   const login = () => {}; // make a login request
//   const logout = () => {}; // clear the token in localStorage and the user data

//   return <AuthContext.Provider value={{ data, login, logout }} {...props} />;
// }

// /**
//  * The useAuth hook exposes the AuthContext.
//  */
// const useAuth = () => useContext(AuthContext);

// export { AuthProvider, useAuth };

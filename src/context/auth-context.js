import React, { useState, useEffect } from "react";

const AuthContext = React.createContext({
  // ovde ne moram da definisem propertije koje prosledjujem
  // ali je pozeljno zbog autocomplete-a i preglednosti koda
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

// na ovaj nacin koristim context kao komponentu, i izbegavam da koristim
// .provider van context fajla
// i dobijam prednost time sto state i funkcije koje prosledjujem
// mogu da definisem unutar contexta
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = (email, password) => {
    localStorage.setItem("isLoggedIn", "logged_in");
    setIsLoggedIn(true);
  };

  useEffect(() => {
    const userLoggedInInfo = localStorage.getItem("isLoggedIn");

    if (userLoggedInInfo === "logged_in") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

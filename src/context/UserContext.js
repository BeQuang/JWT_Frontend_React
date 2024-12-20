/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const userDefaults = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(userDefaults);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({ ...userDefaults, isLoading: false });
  };

  const fetchUser = async () => {
    let response = await getUserAccount();
    if (response && +response.EC === 0) {
      let groupWithRoles = response.DT.groupWithRoles;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.access_token;

      let data = {
        isAuthenticated: true,
        token,
        account: { groupWithRoles, email, username },
        isLoading: false,
      };

      setUser(data);
    } else {
      setUser({ ...userDefaults, isLoading: false });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

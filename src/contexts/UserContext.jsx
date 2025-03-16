import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "",
  });
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default { UserContextProvider, UserContext };

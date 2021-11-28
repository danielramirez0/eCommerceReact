import React from "react";

export const UserContext = React.createContext({
    jwt: localStorage.getItem("JWT"),
    setJWT: () => {},
});
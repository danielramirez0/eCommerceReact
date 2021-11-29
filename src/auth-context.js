import React from "react";

export const AuthContext = React.createContext({
    jwt: "",
    signin: () => {},
    signout: () => {},
});
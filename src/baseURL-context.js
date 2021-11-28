import React from "react";

export const BaseURLContext = React.createContext({
    baseURL: "https://localhost:44394/api/",
    setBaseURL: () => {},
});
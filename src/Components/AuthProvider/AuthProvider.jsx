import { useState } from "react";
import { AuthContext } from "../../auth-context";

const AuthProvider = ({ children }) => {
    let [jwt, setJWT] = useState(null);

    let signin = (newJWT, callback) => {
        setJWT(newJWT);
        callback();
    };

    let signout = (callback) => {
        setJWT(null);
        callback();
    };

    let value = { jwt, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

import React from "react";
import { AuthContext } from "../../auth-context";


const useAuth = () => {
    return React.useContext(AuthContext);
}

export default useAuth;
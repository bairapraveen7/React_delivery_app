 import React from "react";
import { Navigate } from "react-router-dom";

const PrivateNode = ({children}) => {
    return true ? children : <Navigate to="/" />
};

export default PrivateNode;


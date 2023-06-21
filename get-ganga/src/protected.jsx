import { useEffect } from "react";
import { Navigate, Route, useNavigate } from "react-router-dom";

function Protected(props) {
    const {Cmp,...rest} = props;

    let navigate=useNavigate();

    return (
         <>
         <Cmp />
         {localStorage.getItem("token")? <Cmp />:<Navigate to="/" />}
         </>
    )
}

export default Protected;
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UseUserContext } from "../context/UseUserContext";

const UseLogout = () => {
    const navigate = useNavigate();
     
    const { dispatch, user } = UseUserContext();

    const logout = ()=> {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT", payload: null });
        navigate("/login");
    }

    return { logout }
}

export default UseLogout
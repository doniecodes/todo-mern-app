import React from 'react'
import { useState } from 'react'
import { UseUserContext } from "../context/UseUserContext";
import { useNavigate } from 'react-router-dom';

const UseLogin = () => {
    const navigate = useNavigate();
    const [ error, setError ] = useState(null);
     
    const { dispatch, user } = UseUserContext();
    const token = user && user.token;

    const login = async (creds)=> {

        const res = await fetch("https://todo-mern-app-api-f46u.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(creds)
        })
        const json = await res.json();

        if(!res.ok){
            setError(json.errors);
        }

        if(res.ok){
            dispatch({ type: "LOGIN", payload: json });
            localStorage.setItem("user", JSON.stringify(json));
            navigate("/")
        }
    }


  return { login, error }
}

export default UseLogin

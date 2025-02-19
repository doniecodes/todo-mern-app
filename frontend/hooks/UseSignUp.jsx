import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UseUserContext } from "../context/UseUserContext";

const UseSignUp = () => {
    const navigate = useNavigate();
    const [ error, setError ] = useState(null);
     
    const { dispatch, user } = UseUserContext();
    const token = user && user.token;

    const signup = async (creds)=> {

        const res = await fetch("http://localhost:4000/user/signup", {
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
            navigate("/");
        }
    }


  return { signup, error }
}

export default UseSignUp
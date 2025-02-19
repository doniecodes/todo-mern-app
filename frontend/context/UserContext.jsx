import React, { useEffect } from 'react'
import { createContext, useReducer } from 'react'

export const UserContext = createContext();

const initialState = {
    user: null,
    mode: null,
}

export const reducer = (state, action)=> {
    switch(action.type){
        case "LOGIN":
            return {
                user: action.payload
            }

        case "LOGOUT":
            return {
                user: null
            }

        case "MODE_DARK":
            return {
                ...state,
                mode: action.payload,
            }

        case "MODE_LIGHT":
            return {
                ...state,
                mode: action.payload,
            }
    }
}


export const UserContextProvider = ({ children }) => {
    
    const [ state, dispatch ] = useReducer(reducer, initialState);

    useEffect(()=> {
        const user = JSON.parse(localStorage.getItem("user"));
        const mode = localStorage.getItem("mode");
        if(user){
            dispatch({ type: "LOGIN", payload: user });
        }
        if(mode){
            dispatch({ type: "MODE_LIGHT", payload: mode })
        }
    }, [])

    console.log(state)

  return (
    <>
    <UserContext.Provider value={{ ...state, dispatch }}>
        { children }
    </UserContext.Provider>
    </>
  )
}


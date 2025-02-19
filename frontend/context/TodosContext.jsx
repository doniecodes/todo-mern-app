import React from 'react'
import { createContext, useReducer } from 'react'

export const TodosContext = createContext();

const initialState = {
    todos: [],
}

export const reducer = (state, action)=> {
    switch(action.type){
        case "GET_TODOS":
            return {
                todos: action.payload
            }

        case "DELETE_TODO":
            return {
                ...state,
                todos: initialState.todos.filter(todo=> todo.id !== action.payload._id)
            }

        case "UPDATE_TODO":
            return {
                ...state,
                todos: [ ...state.todos, action.payload]
            }

        case "ADD_TODO":
            return {
                ...state,
                todos: [ ...initialState.todos, action.payload]
            }

        case "GET_COMPLETED":
            return {
                ...state,
                todos: initialState.todos.filter(todo=> todo.completed === true)
            }

        case "GET_ACTIVE":
            return {
                ...state,
                todos: initialState.todos.filter(todo=> todo.completed === false)
            }

    }
}


export const TodosContextProvider = ({ children }) => {
    
    const [ state, dispatch ] = useReducer(reducer, initialState);

  return (
    <>
    <TodosContext.Provider value={{ ...state, dispatch }}>
        { children }
    </TodosContext.Provider>
    </>
  )
}


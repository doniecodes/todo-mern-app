import React from 'react'
import { useContext } from 'react'
import { UserContext } from './UserContext'

export const UseUserContext = () => {

    const context = useContext(UserContext);

  return context;
}

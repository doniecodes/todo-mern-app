import React from 'react'
import { useContext } from 'react';
import { TodosContext } from './TodosContext';

export const UseTodosContext = () => {
  const context = useContext(TodosContext);

  return context;

}


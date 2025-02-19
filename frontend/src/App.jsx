import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import './index.css'
import HomePage from '../pages/HomePage'
import MainLayout from "../components/MainLayout"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { TodosContextProvider } from "../context/TodosContext"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Route>
  )
)

const App = () => {
  return (
    <>
    <TodosContextProvider>
        <RouterProvider router={router} />
    </TodosContextProvider>
    </>
  )
}

export default App
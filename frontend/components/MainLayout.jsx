import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const MainLayout = () => {

  return (
    <>
    <Outlet />
    </>
  )
}

export default MainLayout
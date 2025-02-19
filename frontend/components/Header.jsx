import React from 'react'
import { FaLightbulb } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { UseUserContext } from '../context/UseUserContext';
import UseLogout from '../hooks/UseLogout';

const Header = (props) => {
  const { logout } = UseLogout();
  localStorage.setItem("mode", "light");

    let { renderNewItem } = props;

    const { user, dispatch, mode } = UseUserContext();
    const userEmail = user && user.email;

    const handleSwitch = ()=> {
        dispatch({ type: "MODE_DARK", payload: "dark" })
  
        if(mode === "dark"){
          dispatch({ type: "MODE_LIGHT", payload: "light" })
        }
    }

    const handleLogout = async ()=> {
      await logout();
    }

  return (
    <>
      <header className={`header ${mode}`}>
      <nav className="header-nav">
        <div className="switch">
          <FaLightbulb  className={`switcher ${mode}`} onClick={handleSwitch} />
        </div>

        <ul className="nav-links">
          <li>
            { user && <h3>{userEmail}</h3> }

            <NavLink to="/" className="link">Home</NavLink>
            { user ? <NavLink to="/login" className="link" onClick={handleLogout}>Logout</NavLink>
            : <>
                <NavLink to="/login" className="link">Login</NavLink>
                <NavLink to="/signup" className="link">Signup</NavLink>
              </> }
          </li>
        </ul>
      </nav>


      <div className="header-form-wrapper">
        <h1 className='heading-1'>TODO'S</h1>

        <form onSubmit={renderNewItem} className="header-form">
            <div>
            <input name="todo" type="text" className='form-input'
            placeholder='Add a todo here...' />
            <button className='add-btn'>Add</button>
            </div>
        </form>
      </div>

    </header>
    </>
  )
}

export default Header
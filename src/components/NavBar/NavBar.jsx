// npm modules
import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      {user ?
        <ul className='navLinks'>
          <li><NavLink to="">Health Pal</NavLink></li>
          {/* <li><NavLink to="/profiles">Profiles</NavLink></li> */}
          <li><NavLink to="" onClick={handleLogout}>Log Out</NavLink></li>
          {/* <li><NavLink to="/auth/change-password">Change Password</NavLink></li> */}
          {/* <li><NavLink to="/chat/results">Results</NavLink></li> */}
          {/* <li><NavLink to="/chat/concern">Concern</NavLink></li> */}
        </ul>
      :
        <ul className='navLinks'>
          <li><NavLink to="">Health Pal</NavLink></li>
          {/* <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
          <li><NavLink to="/profiles">Profiles</NavLink></li> */}
        </ul>
      }
    </nav>
  )
}

export default NavBar

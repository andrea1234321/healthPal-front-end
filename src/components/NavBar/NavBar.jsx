// npm modules
import { NavLink } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'

const NavBar = ({ user, handleLogout, profile}) => {

  return (
    <nav>
      {user ?
        <ul className='navLinks private'>
          <li><NavLink to=""><img className='photo'src={profile.photo} alt="My Photo" /></NavLink></li>

          <li className='logoName'><NavLink to="/"><img src={logo} alt="Health Pal Logo" />Health Pal</NavLink>
          </li>

          <li className='logout'><NavLink to="" onClick={handleLogout}>Log Out </NavLink></li>
          {/* <li><NavLink to="" onClick={handleLogout}>Log Out</NavLink></li> */}
          {/* <li><NavLink to="/profiles">Profiles</NavLink></li> */}
          {/* <li><NavLink to="/auth/change-password">Change Password</NavLink></li> */}
          {/* <li><NavLink to="/chat/results">Results</NavLink></li> */}
          {/* <li><NavLink to="/chat/concern">Concern</NavLink></li> */}
        </ul>
      :
        <ul className='navLinks public'>
          <li className='logoName'><NavLink to="/"><img src={logo} alt="Health Pal Logo" />Health Pal</NavLink>
          </li>
          {/* <li><NavLink to="/auth/login">Log In</NavLink></li>*/}
          {/* <li><NavLink to="/auth/signup">Sign Up</NavLink></li> */}
        </ul>
      }
    </nav>
  )
}

export default NavBar

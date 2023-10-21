// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import VisitReason from './pages/VisitReason/VisitReason'
import Chat from './pages/Chat/Chat'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'

// styles
import './App.css'

function App() {
  const navigate = useNavigate()

  const [user, setUser] = useState(authService.getUser())
  // const [profile, setProfile] = useState([])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
    // setProfile(null)
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }
  
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const profileData = await profileService.getProfile()
  //     setProfile(profileData)
  //   }
  //   if(user) fetchProfile()
  // }, [user])

  // FOR DEMO PURPOSES ONLY
  const handleProfile = async(profile_name) => {
    try {
      let formData = {}
      if (profile_name === 'Emily'){
        formData = {
          email: 'emily@gmail.com',
          password: 'emily'
        }
      } else {
        formData = {
          email: 'john@gmail.com',
          password: 'john'
        }
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/chat/visit-reason')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      {/* <NavBar user={user} handleLogout={handleLogout} profile={profile} /> */}
      <Routes>
        <Route path="/" element={<Landing user={user} />} />

        {/* FOR DEMO PURPOSES ONLY */}
        <Route
          path="/profiles"
          element={
              <Profiles handleProfile={handleProfile}/>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute user={user}>
              <Chat user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/visit-reason"
          element={ 
            <ProtectedRoute user={user}>
              <VisitReason user={user}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App

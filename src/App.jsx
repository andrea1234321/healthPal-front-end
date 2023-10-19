// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Results from './pages/Results/Results'
import Concern from './pages/Concern/Concern'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'

// styles
import './App.css'

function App() {
  // For testing 
  const problem = {
    concern: "Chest pain",
    location: "Pain radiating down the arm",
    duration: "12 hours",
    quality: "Tightness",
    severity: "Moderate"
  }
  const profileData = {
    sex: "female",
    age: "35",
  }

  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />

        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
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
          path="/chat/concern"
          element={ 
            <ProtectedRoute user={user}>
              <Concern user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/results"
          element={ 
            <ProtectedRoute user={user}>
              <Results problem = {problem}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App

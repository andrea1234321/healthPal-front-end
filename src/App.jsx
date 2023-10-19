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
import Symptoms from './pages/Symptoms/Symptoms'
import Questions from './pages/Questions/Questions'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
// import * as chatService from './services/chatService'

// styles
import './App.css'

function App() {

  const [user, setUser] = useState(authService.getUser())
  // const [results, setResults] = useState([])

  const navigate = useNavigate()
  const [concern, setConcern]= useState('')
  const [problem, setProblem]= useState({})

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddProblem= (form) => {
    setProblem(form)
  }
  
  const handleAddConcern= (userResponse) => {
    setConcern(userResponse)
    console.log(concern)
  }

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
      navigate('/chat/concern')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />

        {/* FOR DEMO PURPOSES ONLY */}
        <Route
          path="/profiles"
          element={
              <Profiles handleProfile={handleProfile}/>
          }
        />
        {/* <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        /> */}
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
              <Results problem={problem} user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/symptoms"
          element={ 
            <ProtectedRoute user={user}>
              <Symptoms user={user} handleAddConcern={handleAddConcern}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/questions"
          element={ 
            <ProtectedRoute user={user}>
              <Questions user={user} symptom={concern} handleAddProblem={handleAddProblem}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App

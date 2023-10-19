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
    setProblem({form})
    console.log(problem)
  }
  
  const handleAddConcern= (userResponse) => {
    setConcern(userResponse)
  }

  // const handleFetchResults = async(problem) =>{
  //   const data = await chatService.getResultsFromAPI(problem)
  //   setResults(data.choices[0].message)
  //   navigate('/chat/results')
  // }

  //For testing only
  const symptomData = {
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
              <Results symptomData= {symptomData}/>
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

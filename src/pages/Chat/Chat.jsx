// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// Components
import Results from '../Results/Results'
import Symptoms from '../Symptoms/Symptoms'
import Questions from '../Questions/Questions'

function Chat({user}) {

  const [concern, setConcern]= useState('')
  const [problem, setProblem]= useState({})

  const handleAddProblem= (form) => {
    setProblem(form)
    console.log("problem", problem)
  }

  const handleAddConcern= (userResponse) => {
    setConcern(userResponse)
    console.log(concern)
  }


  return (
    <>
      <h4 className='note'>This tool is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a life-threatening emergency that requires immediate attention please call 911 or the number for your local emergency service.</h4>
      <p className="greetingQuestion">Hi {user.name}, what is your main concern today?</p>

      <Symptoms
        user={user} 
        handleAddConcern={handleAddConcern}
        concern = {concern}
      />
      
      <Questions 
        user={user}
        symptom={concern} 
        handleAddProblem={handleAddProblem}
      />

      <Results 
        problem={problem} 
        user={user}
      />
    </>
  )
}

export default Chat
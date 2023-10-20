// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// Components
import Results from '../../components/Results/Results'
import Symptom from '../../components/Symptom/Symptom'
import Hpi from '../../components/Hpi/Hpi'

function Chat({user}) {

  const [symptom, setSymptom]= useState('')
  const [hpi, setHpi]= useState({})
  let hpiComplete= false

  const handleAddHpi= (form) => {
    setHpi(form)
    hpiComplete= true
    console.log("HPI:", hpi)
  }

  const handleAddSymptom= (userResponse) => {
    setSymptom(userResponse)
    console.log(symptom)
  }


  return (
    <>
      <h4 className='note'>This tool is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a life-threatening emergency that requires immediate attention please call 911 or the number for your local emergency service.</h4>
      <p className="chatBubble">Hi {user.name}, what is your main concern today?</p>

      <Symptom
        user={user} 
        handleAddSymptom={handleAddSymptom}
        symptom={symptom}
      />
      
      {symptom ? 
        <Hpi 
          user={user}
          symptom={symptom} 
          handleAddHpi={handleAddHpi}
        /> 
        : ''}
      {/* {hpiComplete ? 
        <Results 
          problem={hpi} 
          user={user}
        />
        : ''} */}
    </>
  )
}

export default Chat

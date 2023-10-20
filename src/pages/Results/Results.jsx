// npm modules
import { useState, useEffect } from "react"

// services
import * as chatService from '../../services/chatService'

const Results = ({problem, user}) => {
  
  const [results, setResults] = useState(false)

  const problemString = `
    Primary symptom: ${problem.concern}
    Location of symptom: ${problem.location}
    Duration of symptom: ${problem.duration} ${problem.unit}
    Feels like: ${problem.quality}
    Triggers of symptom: ${problem.trigger}
    Pain intensity: ${problem.severity}
    Alleviating factors: ${problem.alleviatingFactors}
    Exacerbating factors: ${problem.exacerbatingFactors}
    Accompanying symptoms: ${problem.otherSxs}
  `

  useEffect(() => {   
    const fetchResults = async() =>{
      try {
        const data = await chatService.getResultsFromAPI(problemString)
        setResults(data.choices[0].message)
      } catch (error){
        console.error("Error fetching results from the API:", error);
      }
    }
    if (!results) fetchResults()
  },[])

  return (
    <>
      <h4 className='note'>This tool is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a life-threatening emergency that requires immediate attention please call 911 or the number for your local emergency service.</h4>
      <p className="greetingQuestion">Hi {user.name}, can you tell me a little bit more about the {problem.concern}?</p>
      <p>These are the details for my {problem.concern}:</p>
      <div>
        <p>{problem.concern}</p>
        <p> <b>Location:</b>{problem.location}</p>
        <p><b>Duration:</b> {problem.duration}</p>
        <p><b>Quality:</b> {problem.quality}</p>
        <p><b>Triggered By:</b> {problem.trigger}</p>
        <p><b>Intensity:</b> {problem.intensity}</p>
        <p><b>Alleviated By:</b> {problem.alleviatingFactors}</p>
        <p><b>Exacerbated By:</b> {problem.exacerbatingFactors}</p>
        <p><b>Accompanying Symptoms:</b>{problem.otherSxs}</p>
      </div>
      <div>
        <p>Thanks for describing your symptom.</p>
        <p>The results I’m about to show you <b>is not a diagnosis or medical advice.</b> Please seek medical care your symptoms seem serious. </p>
      </div>
      <div>
        <p>Based on what you told me, here’s what we recommend you should do next for your immediate problem:</p>
      </div>
      <div>
        {!results ? <p>Loading...</p> : <p>{results.content}</p>}
      </div>
    </>
  );
}

export default Results;

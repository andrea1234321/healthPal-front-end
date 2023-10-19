// npm modules
import { useState, useEffect } from "react"

// services
import * as chatService from '../../services/chatService'

const Results = ({problem}) => {
  
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
    <div>
      {!results ? <p>Loading...</p> : <p>{results.content}</p>}
    </div>
  );
}

export default Results;
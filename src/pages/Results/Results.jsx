// npm modules
import { useState, useEffect } from "react"

// services
import * as chatService from '../../services/chatService'

// css
import styles from './Results.module.css'


const Results = ({symptomData}) => {
  const [results, setResults] = useState(false)

  useEffect(() => {
    const fetchResults = async() =>{
      const data = await chatService.getResultsFromAPI(symptomData)
      console.log("results retrieved - should only be once in prod")
      setResults(data.choices[0].message)
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
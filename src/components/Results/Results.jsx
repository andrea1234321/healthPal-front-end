// npm modules
import { useState, useEffect } from "react"

// services
import * as chatService from '../../services/chatService'
import { Link } from "react-router-dom"

// assets
import thumbsdown from '../../assets/icons/thumbsdown.svg'
import thumbsup from '../../assets/icons/thumbsup.svg'
import warning from '../../assets/icons/warning.svg'
import styles from './Results.module.css'

const Results = ({problem, handleAddHpi, handleAddSymptom}) => {
  const [results, setResults] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {   
    const fetchResults = async() =>{
      try {
        const data = await chatService.getResultsFromAPI(problem)
        setResults(parseResults(data.choices[0].message.content))
      } catch (error){
        console.error("Error fetching results from the API:", error);
      }
    }
    if (problem && !results) fetchResults()
  },[])

  const parseResults = (raw) => {
    console.log("RAW:", raw)
    const sections = raw.split("\n");
    let text = {}
    for (let section of sections) {
      const [header, value] = section.split(": ");
      text[header.toLowerCase()] = value
    }
    console.log("PARSED:",text)
    return text
  }

  const handleThumbsUpClick =() =>{
    if (feedback !== true) setFeedback(true)
  }

  const handleThumbsDownClick =() =>{
    if (feedback !== false) setFeedback(false)
  }

  const handleReset =() =>{
    handleAddSymptom(false)
    handleAddHpi(false)
    setResults(false)
    setFeedback(null)
  }

  return (
    <main>
      <div className = 'chatBubble'>
        <p>Thanks for describing your symptoms.</p>
        <p>The results I’m about to show you <b>is not a diagnosis or medical advice.</b> Please seek medical care if your symptoms seem serious. </p>
      </div>

      {!results ?
        <p>I'm working on it...</p>
      :
        <div className={`chatBubble ${styles.results} ${results.urgent === 'Yes' ? styles.warning : styles.ok}`}>

          <section className={styles.title}>
            {results.urgent === 'Yes' ?
              <>
                <img className="alert" src={warning} alt= 'Warning symbol' />
                <h1>Alarming scenario detected</h1>
              </>
            :
              <>
                <img className="alert" src={warning} alt= 'Warning symbol' />
                <h1>What I found</h1>
              </>
            }
          </section>


          <p> I am <b>{results.score}% confident</b> with the following recommendation. {results.reason}</p>
          
          <h2>Best treatment option and what to do next</h2>
          <p>{results.treatment}</p>
          <h2>Symptoms that led to the recommended treatment</h2>
          <p>{results.symptoms}</p>
          
          <section className= 'feedback'>
            <p>Was the recommendation reasonable?</p>
            <button onClick={handleThumbsUpClick} className={feedback ? 'selected': ''}>
              <img className="icon" src={thumbsup} alt= 'A thumbsup icon' />
            </button>
            <button onClick={handleThumbsDownClick} className={feedback === false ? 'selected': ''}>
                <img className="icon" src={thumbsdown} alt= 'A thumbsdown icon' />
            </button>
          </section>

          <section className= 'exit'>
            <Link to="/">
              <button>Thank you, finish demo</button>
            </Link>
            <button>Save to my chat history</button>
            <p>If this doesn't seem right, you can start over.</p>
            <button onClick={handleReset}>Start Over</button>
          </section>
        </div>
      }
    </main>
  );
}

export default Results;

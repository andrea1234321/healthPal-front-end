// npm modules
import { useState, useEffect, useRef } from "react"

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
  const resultsRef= useRef()

  useEffect(() => {   
    const fetchResults = async() =>{
      try {
        const data = await chatService.getResultsFromAPI(problem)
        setResults(parseResults(data.choices[0].message.content))
        // handleScrollToResults()
      } catch (error){
        console.error("Error fetching results from the API:", error);
      }
    }
    if (problem && !results) fetchResults()
  },[])

  const parseResults = (raw) => {
    console.log("RAW:", raw)
    const parsedData = {}
    const lines = raw.split('\n')

    let currentKey = '';
    lines.forEach(line => {
      const matches = line.match(/^([A-Z]+): (.+)$/);
      if (matches) {
        currentKey = matches[1].toLowerCase()
        parsedData[currentKey] = matches[2]
      } else if (currentKey) {
        // To account for lists included in the response: append the line to previus value;
        parsedData[currentKey] += '\n' + line
      }
    })
    console.log("PARSED:",parsedData)
    return parsedData
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

  // function handleScrollToResults(){
  //   resultsRef.current.scrollIntoView({ behavior: "smooth"})
  // }

  return (
    <>
      <div className = 'chatContainer'>
        <p className = 'chatBubble'>Thanks for describing your symptoms.</p>
        <p className = 'chatBubble'>The results I’m about to show you <b>is not a diagnosis or professional medical advice.</b> Please seek medical care if your symptoms seem serious. </p>
      </div>

      {!results ?
        <p>I'm working on it...</p>
      :
      <div className="chatContainer" ref={resultsRef}>
        <div className={`resultsBubble ${styles.results} ${results.urgent === 'Yes\n' ? styles.warning : styles.ok}`}>

          <section className={styles.title}>
            {results.urgent === 'Yes\n' ?
              <>
                <img className="alert" src={warning} alt= 'Warning symbol' />
                <h3 className={styles.warningTitle}>Alarming scenario detected</h3>
              </>
            :
              <>
                <h3 className={styles.okTitle}>What I found</h3>
              </>
            }
          </section>


          <p className={styles.subtext}> I am <b>{results.score}% confident</b> with the following recommendation. {results.reason}</p>
          
          <p className="subtitle">Best treatment option and what to do next</p>
          <p className={styles.subtext}>{results.treatment}</p>
          <p className="subtitle">Symptoms that led to the recommended treatment</p>
          <p className={styles.subtext}>{results.symptoms}</p>
          
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
              <button className="finishButton">Thank you, finish demo</button>
            </Link>
            <button className="saveButton" disabled>Save to my chat history</button>
            <p>If this doesn't seem right, you can start over.</p>
            <button onClick={handleReset} className="startOverButton">Start Over</button>
          </section>
        </div>
      </div> 
      }
    </>
  );
}

export default Results;

// npm modules
import { useState, useEffect } from "react"

// services
import * as chatService from '../../services/chatService'

// components
import thumbsdown from '../../assets/icons/thumbsdown.svg'
import thumbsup from '../../assets/icons/thumbsup.svg'

const Results = ({problem}) => {
  const [results, setResults] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {   
    const fetchResults = async() =>{
      try {
        const data = await chatService.getResultsFromAPI(problem)
        setResults(parseResults(data.choices[0].message.content))
        // setResults(data.choices[0].message)
        // const res = parseResults(results)
      } catch (error){
        console.error("Error fetching results from the API:", error);
      }
    }
    if (problem && !results) fetchResults()
  },[])

  const parseResults = (raw) => {
    console.log("RAW:", raw)
    const sections = raw.split("\n\n");
    let text = {}
    for (let section of sections) {
      const [header, value] = section.split(": ");
      text[header.toLowerCase()] = value
    }
    return text
  }

  const handleThumbsUpClick =() =>{
    if (feedback !== true) setFeedback(true)
  }

  const handleThumbsDownClick =() =>{
    if (feedback !== false) setFeedback(false)
  }

  return (
    <>
      <div className = 'chat'>
        <p>Thanks for describing your symptoms.</p>
        <p>The results I’m about to show you <b>is not a diagnosis or medical advice.</b> Please seek medical care if your symptoms seem serious. </p>
      </div>

      {!results ?
        <p>Loading...</p>
      :
        <div className = 'results-container'>
          {results.urgent === 'Yes' ?
            <h1>Alarming scenario detected</h1>
          :
            <h1>What I found</h1>
          }
          
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
            {/* <Link to="/chat/questions"> */}
              <button>Thank you, finish demo</button>
            {/* </Link> */}
            <button>Save to my chat history</button>
            <p>If this doesn't seem right, you can start over.</p>
            {/* <Link to="/chat/questions"> */}
              <button>Start Over</button>
            {/* </Link> */}
          </section>
        </div>
      }
    </>
  );
}

export default Results;

// npm modules
import { useState, useEffect } from "react"

// services
import * as chatService from '../../services/chatService'

// components
import thumbsdown from '../../assets/icons/thumbsdown.svg'
import thumbsup from '../../assets/icons/thumbsup.svg'

const Results = ({problem, user}) => {
  const [results, setResults] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {   
    const fetchResults = async() =>{
      try {
        const data = await chatService.getResultsFromAPI(problem)
        setResults(data.choices[0].message)
      } catch (error){
        console.error("Error fetching results from the API:", error);
      }
    }
    if (!results) fetchResults()
  },[])

  const handleThumbsUpClick =() =>{
    if (feedback !== true) setFeedback(true)
  }

  const handleThumbsDownClick =() =>{
    if (feedback !== false) setFeedback(false)
  }

  return (
    <>
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
      <div className = 'results-container'>
        {!results ? <p>Loading...</p> : <p>{results.content}</p>}

        <section className= 'feedback-container'>
          <p>Was the recommendation reasonable?</p>
          <button onClick={handleThumbsUpClick} className={feedback ? 'selected': ''}>
            <img className="icon" src={thumbsup} alt= 'A thumbsup icon' />
          </button>
          <button onClick={handleThumbsDownClick} className={feedback === false ? 'selected': ''}>
              <img className="icon" src={thumbsdown} alt= 'A thumbsdown icon' />
          </button>
        </section>

        <section className= 'exit-container'>
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

    </>
  );
}

export default Results;

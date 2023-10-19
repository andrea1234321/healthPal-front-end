// npm modules
import { useState } from 'react'

// css
import styles from './Results.module.css'

// services
import * as chatService from '../../services/chatService'

const Results = ({problem}) => {

  const [message, setMessage] = useState(null)

  const getAIresponse = async() => {
    const options = {
      method: "POST",
      body: JSON.stringify ({
        message: `User's chief complaint is  ${problem.concern}. The location of the problem is ${problem.location}. The duration of the problem is ${problem.duration}. The problem feels like ${problem.quality}. The pain is ${problem.severity}.`
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    

    try {
      const data = await chatService.getResultsFromAPI(options)
      setMessage(data.choices[0].message)
      
    } catch (error) {
      console.error(error)
    }
  }

  const hasData = !!message
  if (hasData) return (
    <p>{message.content}</p>
  )
  // if (!message) return <h1>LOADING...</h1>
  // if (!message) retur <Loading />

  return (
    <div className="app">
      <section className="main">
        <div className= "bottom-section">
          <div className= "input-container">
            <input />
            <div id="submit" onClick={getAIresponse}>➢</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Results;
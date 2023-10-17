import { useState, useEffect } from 'react'

const Chat= () => {

  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null) //title refers to the initial user prompt

  const createNewChat = () => {
    setMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setValue("")
  }

  const getMessages = async() => {
    const options = {
      method: "POST",
      body: JSON.stringify ({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const response = await fetch('http://localhost:3001/api/chat/', options)
      const data = await response.json()
      console.log(options)
      console.log(data)
      setMessage(data.choices[0].message)
    } catch (error) {
      console.error(error)
    }
  }


  useEffect(() => {
    // console.log(currentTitle, value, message)

    if (!currentTitle && value && message){
      setCurrentTitle(value)
    }

    // add to history
    if (currentTitle && value && message) {
      setPreviousChats(prevChats => (
        [...prevChats, {
          title: currentTitle,
          role: "user",
          content: value, // User Prompt
        }, {
          title: currentTitle,
          role: message.role, // 'assistant'
          content: message.content, // AI response
        }]
      ))
    }
  }, [message, currentTitle])
  
  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))


  return (
    <>
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => 
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>)
          }
        </ul>
        <nav>
          <p>Eunice POC</p>
        </nav>
      </section>

      <section className="main">
        {!currentTitle && <h1> Demo GPT</h1>}

        <ul className= "feed">
          {currentChat.map((chatMessage,index) => 
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>)}
        </ul>

        <div className= "bottom-section">
          <div className= "input-container">
            <input value = {value}  onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
            Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT September 25 Version
          </p>
        </div>
      </section>
    </div>
    </>
  )
}

export default Chat

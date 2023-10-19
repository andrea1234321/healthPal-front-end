// npm modules
import { useState, useEffect } from "react"

// services
import * as chatService from '../../services/chatService'
import * as profileService from '../../services/profileService'

// css
import styles from './Results.module.css'


const Results = ({problem}) => {
  console.log("Results:", problem.location)
  const [results, setResults] = useState(false)
  const [profileString, setProfileString] = useState(false)
  const [problemString, setProblemString] = useState(false)
  
  const stringProfileData = (profile) => {
    const age = new Date().getFullYear() - profile.birthYear
    const bmi = Math.round((profile.weight / (profile.height* profile.height)) * 703)

    return (`The user is a ${age} year old ${profile.sex} with a ${bmi} BMI and a medical history of ${profile.medicalHx}.`)
  }

  const stringProblemData = () => {

  }
  
  const fetchProfile = async () => {
    const profileData = await profileService.getProfile()
    const profileString = stringProfileData (profileData)
    setProfileString(profileString)
  }

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const profileData = await profileService.getProfile()
  //     const profileString = stringProfileData (profileData)
  //     setProfileString(profileString)
  //   }
  //   fetchProfile()
  // }, [])

  const fetchResults = async() =>{
    console.log(profileString)
    const data = await chatService.getResultsFromAPI(problemData)
    console.log(data)
    setResults(data.choices[0].message)
  }

  useEffect(() => {   
    // const fetchResults = async() =>{
    //   console.log(profileString)
    //   const data = await chatService.getResultsFromAPI(problemData)
    //   console.log("results retrieved - should only be once in prod")
    //   setResults(data.choices[0].message)
    // }
    if (!profileString) fetchProfile()
    // if (!results) fetchResults()
  },[])


  return (
    <div>
      {!results ? <p>Loading...</p> : <p>{results.content}</p>}
    </div>
  );
}

export default Results;
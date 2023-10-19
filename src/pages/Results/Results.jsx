// npm modules
import { useState, useEffect } from "react"

// services
import * as chatService from '../../services/chatService'
import * as profileService from '../../services/profileService'

// css
import styles from './Results.module.css'


const Results = ({symptomData}) => {
  const [results, setResults] = useState(false)
  // const [profile, setProfile] = useState(false)

  // const stringProfileData= (profile) => {
  //   const age = new Date().getFullYear() - profile.birthYear
    
  //   console.log(age)
  //   const profileString = `${age} year old $profile.sex Patient  `
  // }

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const profileData = await profileService.getProfile()
  //     setProfile(profileData)
  //   }
  //   fetchProfile()
  // }, [])

  useEffect(() => {
    // const fetchProfile = async () => {
    //   const profileData = await profileService.getProfile()
    //   setProfile(profileData)
    // }
    const fetchResults = async() =>{
      const data = await chatService.getResultsFromAPI(symptomData)
      console.log("results retrieved - should only be once in prod")
      setResults(data.choices[0].message)
    }
    // if (!profile) fetchProfile()
    if (!results) fetchResults()
  },[])


  return (
    <div>
      {!results ? <p>Loading...</p> : <p>{results.content}</p>}
    </div>
  );
}

export default Results;
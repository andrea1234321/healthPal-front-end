// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// components
import ProfileCard from '../../components/ProfileCard/ProfileCard'

// services
import * as profileService from '../../services/profileService'

// css
import styles from './Profiles.module.css'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
    }
    fetchProfiles()
  }, [])

  if (!profiles.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }
  
  return (
    <main className={styles.main}>
      <h1>Who do you want to login as?</h1>

      <div className= {styles.container}>
        {profiles.map(profile => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}  
      </div>
    </main>
  )
}

export default Profiles

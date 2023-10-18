// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
    <main className={styles.container}>
      <h1>Please choose a user to begin the demo</h1>

      {/* Make this a component */}
      <div className= "input-container">
        {profiles.map(profile => (
          <div key={profile._id}>
            <Link to="/chat/concern">
              <h2>{profile.name}</h2>
              {/* Make this into a table */}
              <p>Sex assigned at birth: {profile.sex}</p>
              <p>Year of birth: {profile.birthYear}</p>
              <p>Weight: {profile.weight}</p>
              <p>Height: {profile.height}</p>
              <p>Medical History: {profile.medicalHx}</p>
            </Link>
          </div>
        ))}  
      </div>
    </main>
  )
}

export default Profiles

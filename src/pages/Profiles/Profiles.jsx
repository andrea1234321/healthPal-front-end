// npm modules
import { useState, useEffect } from 'react'

// components
import ProfileCard from '../../components/ProfileCard/ProfileCard'

// services
import * as profileService from '../../services/profileService'

// css
import styles from './Profiles.module.css'

const Profiles = ({handleProfile}) => {
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
      <p className='greeting'>Welcome to Health Pal!</p>
      <h3>Who do you want to login as?</h3>
      <div className= {styles.container}>
        {profiles.map(profile => (
          <ProfileCard key={profile._id} profile={profile} handleProfile={handleProfile} />
        ))}  
      </div>
    </main>
  )
}

export default Profiles

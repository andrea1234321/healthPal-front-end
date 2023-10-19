// npm modules
import { useState, useEffect } from 'react'

// npm modules
import { Link } from "react-router-dom"

import styles from './ProfileCard.module.css'

const ProfileCard = ({profile, handleProfile}) => {

  return (
    <button onClick={()=> handleProfile(profile.name)} className={styles.profiles}>
      <h2>{profile.name}</h2>
      <div className={styles.profileLabel}>
        <p>Sex assigned at birth:</p>
        <p>{profile.sex}</p>
      </div>
      <div className={styles.profileLabel}>
        <p>Year of Birth:</p>
        <p>{profile.birthYear}</p>
      </div>
      <div className={styles.profileLabel}>
        <p>Weight:</p>
        <p>{profile.weight} lbs</p>
      </div>
      <div className={styles.profileLabel}>
        <p>Height:</p>
        <p>{profile.height} inches</p>
      </div>
      <div className={styles.profileLabel}>
        <p>Medical History:</p>
        <p>{profile.medicalHx}</p>
      </div>
    </button>
  )
}

export default ProfileCard

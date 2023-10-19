// npm modules
import { useState, useEffect } from 'react'

// npm modules
import { Link } from "react-router-dom"

const ProfileCard = ({profile, handleProfile}) => {

  return (
    <button onClick={()=> handleProfile(profile.name)}>
      <h2>{profile.name}</h2>
      <p>Sex assigned at birth: {profile.sex}</p>
      <p>Year of birth: {profile.birthYear}</p>
      <p>Weight: {profile.weight}</p>
      <p>Height: {profile.height}</p>
      <p>Medical History: {profile.medicalHx}</p>
    </button>
  )
}

export default ProfileCard
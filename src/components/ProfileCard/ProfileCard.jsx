import styles from './ProfileCard.module.css'

const ProfileCard = ({profile, handleProfile}) => {

  const inchesToFeetAndInches= (inches)=> {  
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
  
    if (remainingInches === 0) {
      return `${feet}'`;
    }
    return `${feet}' ${remainingInches}"`;
  }

  const age = new Date().getFullYear() - profile.birthYear

  return (
    <button onClick={()=> handleProfile(profile.name)} className="containerButtons">
      <div className={styles.profileName}>
        <img src={profile.photo}/>
        <h3>{profile.name}</h3>
      </div>
      
      <div className={styles.profileLabel}>
        <p>Sex assigned at birth:</p>
        <p className={styles.profileInfo}>{profile.sex}</p>
      </div>
      <div className={styles.profileLabel}>
        <p>Age:</p>
        <p className={styles.profileInfo}>{age}</p>
      </div>
      <div className={styles.profileLabel}>
        <p>Weight:</p>
        <p className={styles.profileInfo}>{profile.weight} lbs</p>
      </div>
      <div className={styles.profileLabel}>
        <p>Height:</p>
        <p className={styles.profileInfo}>{inchesToFeetAndInches(profile.height)}</p>
      </div>
      <div className={styles.profileLabel}>
        <p>Medical History:</p>
        <p className={styles.profileInfo}>{profile.medicalHx}</p>
      </div>
    </button>
  )
}

export default ProfileCard

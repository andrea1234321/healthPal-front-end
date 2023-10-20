// css
import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <p className={styles.landingGreeting}>Welcome to Health Pal!</p>
      <h1 className={styles.appGoal}>Get Personalized care recommendations based on your medical history.</h1>
      <Link to="/profiles">
        <button className={styles.buttonDemo}>Start Demo</button>
      </Link>
    </main>
  )
}

export default Landing

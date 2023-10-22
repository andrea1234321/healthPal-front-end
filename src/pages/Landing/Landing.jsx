// npm modules
import { Link } from 'react-router-dom'

// css
import styles from './Landing.module.css'

const Landing = () => {
  return (
    <main className={styles.container}>
      <p className={styles.landingGreeting}>Welcome to Health Pal!</p>
      <h1 className={styles.appGoal}>Get personalized care recommendations based on your medical history and more.</h1>
      <Link to="/profiles">
        <button className={styles.buttonDemo}>Start Demo</button>
      </Link>
    </main>
  )
}

export default Landing

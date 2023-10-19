// css
import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h4>Welcome to Health Pal!</h4>
      <h1>Get Personalized care recommendations based on your medical history.</h1>
      <Link to="/profiles">
        <button>Start Demo</button>
      </Link>
    </main>
  )
}

export default Landing

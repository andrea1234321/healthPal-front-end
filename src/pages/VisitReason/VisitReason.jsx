// npm modules
import { Link } from 'react-router-dom'

// css
import styles from './VisitReason.module.css'

const VisitReason = ({user}) => {
  return (
    <>
      <header>
        <p className='greeting'>Welcome back, {user.name}!</p>
        <h2>How can we help you today?</h2>
      </header>
      <main className={styles.visitOptions}>
        <Link to="/chat">
          <button className={styles.visitButton}>
            <h4>I need care now for an immediate problem</h4>
            <p>for my current symptoms</p>
          </button>
        </Link>
        <button className={styles.visitButton}>
          <h4>I need an annual wellness visit</h4>
          <p>required for insurance</p>
        </button>
      </main>
    </>
  )
}


export default VisitReason

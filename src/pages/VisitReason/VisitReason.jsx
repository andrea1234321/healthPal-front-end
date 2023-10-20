// npm modules
import { Link } from 'react-router-dom'

// css
import styles from './VisitReason.module.css'

const VisitReason = ({user}) => {
  return (
    <>
      <main className={styles.visitOptions}>
        <p className='greeting'>Welcome back, {user.name}!</p>
        <h1>How can I help you today?</h1>
        <Link to="/chat">
          <button className="containerButtons">
            <p className={styles.p}><strong>I need care now for an immediate problem</strong></p>
            <p className={styles.p}>for my current symptoms</p>
          </button>
        </Link>
        <button className="containerButtons">
          <p className={styles.p}><strong>I need an annual wellness visit</strong></p>
          <p className={styles.p}>required for insurance</p>
        </button>
      </main>
    </>
  )
}


export default VisitReason

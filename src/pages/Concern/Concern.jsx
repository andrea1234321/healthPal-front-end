// npm modules
import { Link } from 'react-router-dom'

// css
import styles from './Concern.module.css'

const Concern = ({user}) => {
  return (
    <>
      <header>
        <h3>Welcome back, {user.name}</h3>
        <h1>How can we help you today?</h1>
      </header>
    
      <Link to="/chat/questions">
        <section className={styles.main}>
          <p>I need care now for an immediate problem</p>
          <p>for my current symptoms</p>
        </section>
      </Link>

      <section className={styles.secondary}>
        <p>I need an annual wellness visit</p>
        <p>required for insurance</p>
      </section>
    </>
  )
}


export default Concern
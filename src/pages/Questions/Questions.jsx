import {useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "./Questions.module.css"

const Questions = ({symptom, handleAddProblem, user}) => {
  const [form, setForm] = useState({
    concern: symptom,
    location: '',
    duration: '',
    unit: 'minutes',
    quality: '',
    severity: 'Mild',
    trigger: '',
    alleviatingFactors: '',
    exacerbatingFactors: '',
    otherSxs: '',
  })

  //  const navigate = useNavigate()
  //  const handleSubmit = () => {
  //     navigate('/chat/results')
  //  }

   const handleChange = (evt) => {
    setForm({...form, [evt.target.name]: evt.target.value })
  }

  const handleSubmitForm = (evt) => {
    evt.preventDefault()
    handleAddProblem(form)
    console.log(form)
  }

   return ( 
      <>
        <h4 className='note'>This tool is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a life-threatening emergency that requires immediate attention please call 911 or the number for your local emergency service.</h4>
        <p className="greetingQuestion">Hi {user.name}, can you tell me a little bit more about the {symptom}?</p>
        <div className={styles.questionsContainer}>
          {/* <h3 className={styles.symptom}>{symptom}</h3> */}
          {/* <div id="submit" onClick={handleSubmit}>➢</div> */}
          <form autoComplete="off" onSubmit={handleSubmitForm}>
            <div className={styles.questionBlock}>
              <label htmlFor="location-input" className={styles.label}>Where is the {symptom} located?</label>
              <input
                required
                type="text"
                name="location"
                id="location-input"
                placeholder="right-sided, left-sided..."
                value={form.location}
                className={styles.input}
                maxLength={50}
                onChange={handleChange}
              />
            </div>
            <div className={styles.questionBlock}>
              <label htmlFor="duration-input" className={styles.label}>How long have you had the {symptom}</label>
              <div className={styles.lengthAnswers}>
                <input
                  required
                  min="0"
                  type="number"
                  name="duration"
                  id="duration-input"
                  placeholder="5 minutes, 3 days, 1 month, 2 years..."
                  value={form.duration}
                  className={styles.lengthInput}
                  maxLength={5}
                  onChange={handleChange}
                />
                <select 
                  required 
                  name="unit" 
                  id="duration-input"
                  value={form.unit}
                  className={styles.lengthSelect}
                  onChange={handleChange}
                >
                  <option value="Minutes">Minutes</option>
                  <option value="Hours">Hours</option>
                  <option value="Days">Days</option>
                  <option value="Months">Months</option>
                  <option value="Years">Years</option>
                </select>
              </div>
            </div>
            <div className={styles.questionBlock}>
              <label htmlFor="quality-input" className={styles.label}>What does the {symptom} feel like?</label>
              <input
                required
                type="text"
                name="quality"
                id="quality-input"
                placeholder="Dull, sharp/knife-like, achy, pressure, tightness, tingling..."
                value={form.quality}
                className={styles.input}
                maxLength={50}
                onChange={handleChange}
              />
            </div>
            <div className={styles.questionBlock}>
              <label htmlFor="severity-input" className={styles.label}>How intense is the {symptom}?</label>
              <select 
                required 
                name="severity" 
                id="severity-input"
                value={form.severity}
                className={styles.severitySelect}
                onChange={handleChange}
              >
                <option value="Mild">Mild: Slight discomfort</option>
                <option value="Moderate">Moderate: Noticeable and slightly uncomfortable</option>
                <option value="Severe">Severe: Intense and difficult to bear</option>
              </select>
            </div>
            <div className={styles.questionBlock}>
              <label htmlFor="trigger-input" className={styles.label}>What triggered the {symptom}?</label>
              <input
                required
                type="text"
                name="trigger"
                id="trigger-input"
                placeholder="What were you doing when it started? What caused it to occur?"
                value={form.trigger}
                className={styles.input}
                maxLength={50}
                onChange={handleChange}
              />
            </div>
            <div className={styles.questionBlock}>
              <label htmlFor="alleviatingFactors-input" className={styles.label}>What makes the {symptom} feel better?</label>
              <input
                required
                type="text"
                name="alleviatingFactors"
                id="alleviatingFactors-input"
                placeholder="Resting, over-the-counter pain medication, deep breathing, sitting, standing..."
                value={form.alleviatingFactors}
                className={styles.input}
                maxLength={50}
                onChange={handleChange}
              />
            </div>
            <div className={styles.questionBlock}>
              <label htmlFor="exacerbatingFactors-input" className={styles.label}>What makes the {symptom} feel worse?</label>
              <input
                required
                type="text"
                name="exacerbatingFactors"
                id="exacerbatingFactors-input"
                placeholder="Walking, stress, laying down, deep breathing..."
                value={form.exacerbatingFactors}
                className={styles.input}
                maxLength={50}
                onChange={handleChange}
              />
            </div>
            <div className={styles.questionBlockLast}>
              <label htmlFor="otherSxs-input" className={styles.label}>What other symptoms do you have that accompanies the {symptom}?</label>
              <input
                required
                type="text"
                name="otherSxs"
                id="otherSxs-input"
                placeholder="Walking, stress, laying down, deep breathing..."
                value={form.otherSxs}
                className={styles.input}
                maxLength={50}
                onChange={handleChange}
              />
            </div>
            <Link to="/chat/results">
              <button type="submit" className={styles.submit}>Submit</button>
            </Link>
          </form>
        </div>
      </>
   )
}

export default Questions;

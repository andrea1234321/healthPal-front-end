
import { useState } from 'react'
import styles from "./hpi.module.css"

const Hpi = ({symptom, handleAddHpi, user}) => {
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
  const [formComplete, setFormComplete]= useState(false)


   const handleChange = (evt) => {
    setForm({...form, [evt.target.name]: evt.target.value })
  }

  const handleSubmitForm = (evt) => {
    evt.preventDefault()
    handleAddHpi(form)
    setFormComplete(true)
    console.log(form)
  }

   return ( 
      <>
      <div className='chatContainer'>
        <p className="chatBubble">Can you tell me more about your {symptom}?</p>
      </div>
      {formComplete ? 
        <div className='userContainer'>
          <div className='user'>
            <p className="userBubble">These are all the symptoms I'm experiencing for my {symptom}:</p>
            <div className='hpiBubble'>
              <p className='hpiSymptom'>{symptom}</p>
              <div className='hpi'>
                <p><span className='category'>Location:</span> {form.location}</p>
                <p><span className='category'>Duration:</span>{form.duration} {form.unit}</p>
                <p><span className='category'>Quality:</span> {form.quality}</p>
                <p><span className='category'>Severity:</span> {form.severity}</p>
                <p><span className='category'>Triggered By:</span> {form.trigger}</p>
                <p><span className='category'>Alleviated By:</span>{form.alleviatingFactors}</p>
                <p><span className='category'>Exacerbated By:</span> {form.exacerbatingFactors}</p>
                <p><span className='category'>Accompanying Symptoms:</span> {form.otherSxs}</p>
              </div>
            </div>
          </div>
        </div>
      : 
        <div className={styles.hpiContainer}>
          <p>{symptom}</p>
          <hr class="solid"></hr>
          <form autoComplete="off" onSubmit={handleSubmitForm}>
            <div className={styles.hpiBlock}>
              <label htmlFor="location-input" className={styles.label}>Where is the {symptom} located? Or respond with "n/a".</label>
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
            <hr class="solid"></hr>
            <div className={styles.hpiBlock}>
              <label htmlFor="duration-input" className={styles.label}>How long have you had the {symptom}?</label>
              <div className={styles.lengthAnswers}>
                <input
                  required
                  min="0"
                  type="number"
                  name="duration"
                  id="duration-input"
                  placeholder="enter a number"
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
            <hr class="solid"></hr>
            <div className={styles.hpiBlock}>
              <label htmlFor="quality-input" className={styles.label}>What does the {symptom} feel like? Or respond with "n/a".</label>
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
            <hr class="solid"></hr>
            <div className={styles.hpiBlock}>
              <label htmlFor="severity-input" className={styles.label}>How intense is the {symptom}? Or respond with "n/a".</label>
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
            <hr class="solid"></hr>
            <div className={styles.hpiBlock}>
              <label htmlFor="trigger-input" className={styles.label}>What triggered the {symptom}? Or respond with "n/a".</label>
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
            <hr class="solid"></hr>
            <div className={styles.hpiBlock}>
              <label htmlFor="alleviatingFactors-input" className={styles.label}>What makes the {symptom} feel better? Or respond with "n/a".</label>
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
            <hr class="solid"></hr>
            <div className={styles.hpiBlock}>
              <label htmlFor="exacerbatingFactors-input" className={styles.label}>What makes the {symptom} feel worse? Or respond with "n/a".</label>
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
            <div className={styles.hpiBlockLast}>
              <label htmlFor="otherSxs-input" className={styles.label}>What other symptoms do you have that accompanies the {symptom}? Or respond with "n/a".</label>
              <input
                required
                type="text"
                name="otherSxs"
                id="otherSxs-input"
                placeholder="Shortness of breath, headache, fever, coughing, unexplained weight loss..."
                value={form.otherSxs}
                className={styles.input}
                maxLength={50}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.submit}>Submit</button>
          </form>
        </div>
        }
      </>
   )
}

export default Hpi;

import {useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Questions = ({symptom, handleAddProblem}) => {
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

  const navigate = useNavigate()

   const handleChange = (evt) => {
    setForm({...form, [evt.target.name]: evt.target.value })
  }

  const handleSubmitForm = (evt) => {
    evt.preventDefault()
    handleAddProblem(form)
    console.log(form)
    navigate('/chat/results')
  }

   return ( 
      <>
        <h1>{symptom}</h1>
         {/* <div id="submit" onClick={handleSubmit}>➢</div> */}
         <form autoComplete="off" onSubmit={handleSubmitForm}>
          <label htmlFor="location-input">Where is the {symptom} located?</label>
          <input
            required
            type="text"
            name="location"
            id="location-input"
            placeholder="right-sided, left-sided..."
            value={form.location}
            onChange={handleChange}
          />

          <label htmlFor="duration-input">How long have you had the {symptom}</label>
          <input
            required
            min="0"
            type="number"
            name="duration"
            id="duration-input"
            placeholder="5 minutes, 3 days, 1 month, 2 years..."
            value={form.duration}
            onChange={handleChange}
          />
          <select 
            required 
            name="unit" 
            id="duration-input"
            value={form.unit}
            onChange={handleChange}
          >
            <option value="Minutes">Minutes</option>
            <option value="Hours">Hours</option>
            <option value="Days">Days</option>
            <option value="Months">Months</option>
            <option value="Years">Years</option>
          </select>

          <label htmlFor="quality-input">What does the {symptom} feel like?</label>
          <input
            required
            type="text"
            name="quality"
            id="quality-input"
            placeholder="Dull, sharp/knife-like, achy, pressure, tightness, tingling..."
            value={form.quality}
            onChange={handleChange}
          />

          <label htmlFor="severity-input">How intense is the {symptom}?</label>
          <select 
            required 
            name="severity" 
            id="severity-input"
            value={form.severity}
            onChange={handleChange}
          >
            <option value="Mild">Mild: Slight discomfort</option>
            <option value="Moderate">Moderate: Noticeable and slightly uncomfortable</option>
            <option value="Severe">Severe: Intense and difficult to bear</option>
          </select>

          <label htmlFor="trigger-input">What triggered the {symptom}?</label>
          <input
            required
            type="text"
            name="trigger"
            id="trigger-input"
            placeholder="What were you doing when it started? What caused it to occur?"
            value={form.trigger}
            onChange={handleChange}
          />

          <label htmlFor="alleviatingFactors-input">What makes the {symptom} feel better?</label>
          <input
            required
            type="text"
            name="alleviatingFactors"
            id="alleviatingFactors-input"
            placeholder="Resting, over-the-counter pain medication, deep breathing, sitting, standing..."
            value={form.alleviatingFactors}
            onChange={handleChange}
          />

          <label htmlFor="exacerbatingFactors-input">What makes the {symptom} feel worse?</label>
          <input
            required
            type="text"
            name="exacerbatingFactors"
            id="exacerbatingFactors-input"
            placeholder="Walking, stress, laying down, deep breathing..."
            value={form.exacerbatingFactors}
            onChange={handleChange}
          />

          <label htmlFor="otherSxs-input">What other symptoms do you have that accompanies the {symptom}?</label>
          <input
            required
            type="text"
            name="otherSxs"
            id="otherSxs-input"
            placeholder="Walking, stress, laying down, deep breathing..."
            value={form.otherSxs}
            onChange={handleChange}
          />
          {/* <Link to="/chat/results"> */}
            <button type="submit">Submit</button>
          {/* </Link> */}
        </form>
      </>
   )
}

export default Questions;

import {useNavigate } from 'react-router-dom'

const Questions = ({problem}) => {

   const navigate = useNavigate()
   const handleSubmit = () => {
      navigate('/chat/results')
   }

   return ( 
      <>
         <p>{problem.concern}{console.log(problem)}</p>
         <div id="submit" onClick={handleSubmit}>➢</div>
      </>
   )
}

export default Questions;

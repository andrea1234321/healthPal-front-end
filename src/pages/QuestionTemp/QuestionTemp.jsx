const QuestionTemp = ({problem}) => {


  
  return ( 
    <>
       <p>{problem.concern}{console.log(problem)}</p>
       <div id="submit" onClick={getAIresponse}>➢</div>
    </>
   );
}
 
export default QuestionTemp;
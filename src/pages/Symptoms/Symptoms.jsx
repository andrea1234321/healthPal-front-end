import { useState } from "react";
import data from "../../data/data.json"
import { Link } from 'react-router-dom'
import styles from './Symptoms.module.css'

const Symptoms = ({handleAddConcern, user}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);


  const handleInputChange = (event) => {
    const {value} = event.target;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (searchTerm) => {
    const filteredData = data.filter((symptom) =>
    symptom.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  setFilteredData(filteredData);
  };

  const handleClickSymptom = (event) => {
    setSearchTerm(event.target.innerHTML);
    filterData(event.target.innerHTML);
  }

  return ( 
    <>
      <h4 className={styles.note}>This tool is not a substitute for professional medical advice, diagnosis, or treatment. If you are experiencing a life-threatening emergency that requires immediate attention please call 911 or the number for your local emergency service.</h4>
      <p className={styles.greetingQuestion}>Hi {user.name}, what is your main concern today?</p>
      <input 
        type="text" 
        placeholder="Search for a symptom" 
        value={searchTerm}
        onChange={handleInputChange}
        />
      {/* <Link to="/chat/questions" >
        <button onClick={()=> handleAddConcern(searchTerm)}>enter</button>
      </Link>
      <div>
        {searchTerm ? 
          <ul>
            {filteredData.map((item)=> (
              <li key={item.id} onClick={handleClickSymptom} >
                {item.name}
              </li>
            ))}
          </ul>
            : ''} */}
      {/* <Link to="/chat/questions" >
        <button onClick={()=> handleAddConcern(searchTerm)}>enter</button>
      </Link> */}
      <div>
        {searchTerm ? 
          <ul className={styles.symptomList}>
            {filteredData.map((item)=> (
              <Link to="/chat/questions">
                <li className={styles.symptomOptions} key={item.id} onClick={()=> handleAddConcern(item.name)} >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
            : ''}
      </div>
    </>
   );
}
 
export default Symptoms;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data/data.json"
import styles from './Symptom.module.css'

const Symptom = ({handleAddSymptom, user}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  // const navigate= useNavigate()
  const [symptomAdded, setSymptomAdded] = useState(false)
  // let symptomAdded= false
  console.log("symptom added before:", symptomAdded)

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

  const handleClickSymptom = (symptom) => {
    console.log("symptom:", symptom)
    setSearchTerm(symptom)
    handleAddSymptom(symptom)
    setSymptomAdded(true)
    console.log('symptom added?', symptomAdded)
    console.log("searchTerm", searchTerm)
    // navigate('/chat/questions')
  }

  return ( 
    <>
      {symptomAdded ? 
      <div>
          <p className="userBubble">I have {searchTerm}</p>
        </div>
      :   
      <>
      <input 
      type="text" 
      placeholder="Search for a symptom" 
      value={searchTerm}
      onChange={handleInputChange}
      className={styles.symptomInput}
      />
      <div>
        {searchTerm ? 
          <ul className={styles.symptomList}>
            {filteredData.map((item)=> (
                <li key={item.id} className={styles.symptomOptions} onClick={()=> handleClickSymptom(item.name)} >
                  {item.name}
                </li>
            ))}
          </ul>
            : ''}
      </div>
      </>
    }
  
        
    </>
   );
}
 
export default Symptom;

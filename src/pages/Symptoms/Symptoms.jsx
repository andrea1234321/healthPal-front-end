import { useState } from "react";
import data from "../../data/data.json"
import { Link } from 'react-router-dom'
import styles from './Symptoms.module.css'

const Symptoms = ({handleAddConcern, user, concern}) => {
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
              // <Link to="/chat/questions">
                <li key={item.id} className={styles.symptomOptions} onClick={()=> handleAddConcern(item.name)} >
                  {item.name}
                </li>
              // </Link>
            ))}
          </ul>
            : ''}
      </div>
    </>
   );
  
}
export default Symptoms;

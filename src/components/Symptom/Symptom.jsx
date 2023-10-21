import { useState, useRef } from "react";
import data from "../../data/data.json"
import styles from './Symptom.module.css'

const Symptom = ({handleAddSymptom, symptom, symptomAdded}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const symptomRef= useRef()

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

  const handleClickSymptom = async (symptom) => {
    setSearchTerm(symptom)
    await handleAddSymptom(symptom)
    setSearchTerm('')
    handleScrollToSymptom()
  }
  function handleScrollToSymptom(){
    symptomRef.current.scrollIntoView()
  }
 
  return ( 
    <div className="userContainer" ref={symptomRef}>
      {symptomAdded ? 
        <div className="user" >
          <p className="userBubble" >My current symptom is: {symptom}</p>
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
    </div>
   );
}
 
export default Symptom;

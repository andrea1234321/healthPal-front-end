import { useState } from "react";
import data from "../../data/data.json"
import { Link } from 'react-router-dom'

const Symptoms = ({handleAddConcern}) => {
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
      <p>What is your current concern?</p>
      <input 
        type="text" 
        placeholder="Search for a symptom" 
        value={searchTerm}
        onChange={handleInputChange}
        />
      <Link to="/chat/questions" >
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
            : ''}
      </div>
    </>
   );
}
 
export default Symptoms;

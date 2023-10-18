import { useState } from "react";
import data from "../../data/data.json"

const Symptoms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);


  const handleInputChange = (event) => {
    const {value} = event.target;
    setSearchTerm(value);
    filterData(value);
  };

  const filterData = (searchTerm) => {
    const filteredData = data.filter((symptom) =>
      symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  setFilteredData(filteredData);
};
  return ( 
    <>
      <p>What is your current concern?</p>
      <input 
        type="text" 
        placeholder="Search for a symptom" 
        value={searchTerm}
        onChange={handleInputChange}
        />
      <button>enter</button>
      <div>
        {searchTerm ? 
          <ul>
            {filteredData.map((item)=> (
              <li key={item.id}>
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

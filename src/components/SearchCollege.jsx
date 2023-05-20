import './search.css';
import { useEffect, useState } from 'react';

function SearchCollege() {
  const [country, setCountry] = useState('');
  const [universityNames, setUniversityNames] = useState([]);

  const fetchUniversities = async () => {
    try {
      const response = await fetch(`http://universities.hipolabs.com/search?country=${country}`);
      const data = await response.json();
      
      const names = data.map((university) => university.name);
      setUniversityNames(names);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [country]);

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

  return (
    <div className='container'>
      <h1>Universities for Higher Learning</h1>
      <div className="formInput">
        <h4 id='head'>Discover a University of Your Choice</h4>
        <label>Enter the Country Name:</label>
        <input type="text" placeholder='country' value={country} onChange={handleChange} /><br/>
        <button className="submitBtn" onClick={fetchUniversities}>Click to Search</button>
      </div>
      <div className="dataFound">
      <h3>{country} has <span>{universityNames.length} </span>universities</h3>

        <ul>
        {universityNames.map((name, index) => (
          <div className='box'>
          <h4 id='schoolName' key={index}> {index}. {name} -- {country}</h4>
          </div>
        ))}
        </ul>
       
      </div>
    
    </div>
  );
}

export default SearchCollege;

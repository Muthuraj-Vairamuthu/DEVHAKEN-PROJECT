import React, { useState } from 'react';
import axios from 'axios';
import './Macros.css';
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';


function MacroCalculator() {
    const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');
//   const [macros, setMacros] = useState(null);

  const [output, setOutput] = useState('');

  const handleCalculate = async () => {
    const url = "https://fitness-calculator.p.rapidapi.com/macrocalculator";
    let goalString = '';
  
    if (goal === '1') {
      goalString = 'maintain';
    } else if (goal === '2') {
      goalString = 'mildlose';
    } else if (goal === '3') {
      goalString = 'weightlose';
    } else {
      goalString = 'extremegain';
    }
    const queryString = {
      age: age,
      gender: gender,
      height: height,
      weight: weight,
      activitylevel: activityLevel,
      goal:goalString
    };
  
    
  
    // const queryString2 = {
    //   ...queryString,
    //   goal: goalString
    // };
  
    const headers = {
      "X-RapidAPI-Key": "595b313d00mshe6acf6bf834f81bp159fafjsn80660e84b167",
      "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com"
    };
  
    try {
      const response = await axios.get(url, { headers: headers, params: queryString });
      console.log('API Response:', response.data);
  
      const proteins_per_meal = Math.floor(parseInt(response.data.data.balanced.protein) / 3);
        const fat_per_meal = Math.floor(response.data.data.balanced.fat / 3);
    const carbs_per_meal = Math.floor(response.data.data.balanced.carbs / 3);

      setOutput(`Proteins per meal: ${proteins_per_meal}, Fat per meal: ${fat_per_meal}, Carbs per meal: ${carbs_per_meal}`);
      console.log('%cOutput:', 'color: white', output);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <div className="wrapper">
      <h2>Macro Calculator</h2>
      <Link to="/" className="button-link">Go to Start Page</Link>
      <div className="inputs">
        <div className="input">
          <label>
            Age:
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} className="input" />
          </label>
        </div>
        <div className="input">
          <label>
            Gender:
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="input" />
          </label>
        </div>
        <div className="input">
          <label>
            Height:
            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} className="input" />
          </label>
        </div>
        <div className="input">
          <label>
            Weight:
            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} className="input" />
          </label>
        </div>
        <div className="input">
          <label>
            Activity Level:
            <input type="text" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="input" />
          </label>
        </div>
        <div className="select-wrapper">
          <label>
            Select Goal:
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="input">
              <option value="1">Balanced</option>
              <option value="2">Low Fat</option>
              <option value="3">Low Carbs</option>
              <option value="4">High Protein</option>
            </select>
          </label>
        </div>
      </div>
      <button onClick={handleCalculate} className="button-link">Calculate</button>
      <p style={{ color: 'white', margin: '0' }}>{output}</p>
    </div>
  );
  
}

export default MacroCalculator;

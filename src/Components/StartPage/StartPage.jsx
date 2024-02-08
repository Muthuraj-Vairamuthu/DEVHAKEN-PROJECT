import React, { useState } from 'react';
import axios from 'axios';
import './StartPage.css'; 
import {useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom';


function CalorieCalculator() {
  const navigate = useNavigate();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');
  const [burnCalories, setBurnCalories] = useState(null); // State variable to hold the calculated burn calories
  const [output, setOutput] = useState('');  // State variable to hold the calculated burn calories

  const handleCalculate = () => {
    const url = "https://fitness-calculator.p.rapidapi.com/dailycalorie";
    const activity_level = `level_${activityLevel}`;
    const queryParams = {
      age: age,
      gender: gender,
      height: height,
      weight: weight,
      activitylevel: activity_level
    };

    const headers = {
      "X-RapidAPI-Key": "595b313d00mshe6acf6bf834f81bp159fafjsn80660e84b167",
      "X-RapidAPI-Host": "fitness-calculator.p.rapidapi.com"
    };

    axios.get(url, { params: queryParams, headers: headers })
      .then(response => {
        const inputCalories = response.data.data.goals['maintain weight'];
        let calculatedBurnCalories = 0;

        if (goal === '1') {
          calculatedBurnCalories = 0;
        } else if (goal === '2') {
          calculatedBurnCalories = inputCalories - response.data.data.goals['Mild weight loss']['calory'];
        } else if (goal === '3') {
          calculatedBurnCalories = inputCalories - response.data.data.goals['Weight loss']['calory'];
        } else {
          calculatedBurnCalories = inputCalories - response.data.data.goals['Extreme weight loss']['calory'];
        }
        setBurnCalories(calculatedBurnCalories); // Update the calculated burn calories
        setOutput(`Burn Calories: ${calculatedBurnCalories}`);
        // console.log('%c Output: ' + calculatedBurnCalories, 'color: white');
 /// Update the calculated burn calories
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="wrapper">
      <h1>Fit O Mania</h1>
      <Link to="/macros" className="button-link">Go to Macros</Link>
      <div className="inputs">
        <div className="input">
          <label>
            Age:
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>
        </div>
        <div className="input">
          <label>
            Gender:
            <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
          </label>
        </div>
        <div className="input">
          <label>
            Height:
            <input type="text" value={height} onChange={(e) => setHeight(e.target.value)} />
          </label>
        </div>
        <div className="input">
          <label>
            Weight:
            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </label>
        </div>
        <div className="input">
          <label>
            Activity Level:
            <input type="text" value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} />
          </label>
        </div>
        <div className="select-wrapper">
          <label>
            Select Your Goal
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="1">Maintain Weight</option>
              <option value="2">Mild Weight Loss</option>
              <option value="3">Weight Loss</option>
              <option value="4">Extreme Weight Loss</option>
            </select>
          </label>
        </div>
      </div>
      <button onClick={handleCalculate} className="button-link">Calculate</button>
      
      {burnCalories !== null && (
        <div style={{
          backgroundColor: 'transparent',
          padding: '10px',
          borderRadius: '5px',
          marginTop: '10px',
        }}>
          <p style={{ color: 'white', margin: '0' }}>{output}</p>
        </div>
      )}
    </div>
  );
  
}

export default CalorieCalculator;

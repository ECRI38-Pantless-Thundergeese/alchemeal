import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function Profile(props) {
  // adding properties to state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allergy, setAllergy] = useState(null);
  const [diet, setDiet] = useState(null);
  // send JSON file to the server

  //   useEffect(() => {
  //     fetch('http://localhost:3000/profile/:username')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setFirstName(data.firstName);
  //         setLastName(data.lastName);
  //         setAllergy(data.allergy);
  //         setDiet(data.diet);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  const handleProfile = () => {
    fetch('http://localhost:3000/profile/:username', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        allergy,
        diet,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('profile updated:', data);
      })
      .catch((err) => console.log(err));
  };

  // list of items for the react-select
  const allergies = [
    { value: 'dairy', label: 'Dairy' },
    { value: 'gluten', label: 'Gluten' },
    { value: 'wheat', label: 'Wheat' },
    { value: 'soy', label: 'Soy' },
    { value: 'shellfish', label: 'Shellfish' },
    { value: 'lupine', label: 'Lupine' },
  ];

  const dietaryRestrictions = [
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'none', label: 'None' },
  ];

  const handleChangeNames = (event) => {
    console.log('Option selected:', event.target.id);
    if (event.target.id === 'firstName') setFirstName(event.target.value);
    if (event.target.id === 'lastName') setLastName(event.target.value);
  };

  const handleChangeAllergy = (selectedOption) => {
    setAllergy(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const handleChangeDiet = (selectedOption) => {
    setDiet(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  const handleSubmit = (e) => {
    alert('changes have been made');
  };

  const navigate = useNavigate();
  const handleExit = () => {
    navigate('/feature');
  };

  return (
    <div>
      <h1>Edit My Profile</h1>
      <form onSubmit={handleSubmit} className='loginContainer'>
        <div>
          <label>
            <b>First Name:</b>
            <input id='firstName' type='text' onChange={handleChangeNames} />
          </label>
          <br />
          <label>
            <b>Last Name:</b>
            <input id='lastName' type='text' onChange={handleChangeNames} />
          </label>
        </div>
        <div>
          <h2>My Allergies</h2>
          <Select
            isMulti
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? '#e2ffe2' : 'salmon',
              }),
            }}
            id='allergy'
            options={allergies}
            onChange={handleChangeAllergy}
          />
        </div>
        <div>
          <h2>My Diet</h2>
          <Select
            isMulti
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? '#e2ffe2' : 'salmon',
              }),
            }}
            options={dietaryRestrictions}
            onChange={handleChangeDiet}
          />
        </div>
        <button onClick={handleProfile} type='submit'>
          Submit
        </button>
        <button onClick={handleExit}>Home Page</button>
      </form>
    </div>
  );
}

export default Profile;

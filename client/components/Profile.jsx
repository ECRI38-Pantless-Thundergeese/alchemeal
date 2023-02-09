import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useSelector, useDispatch } from 'react-redux';
import { setAppPage, setGlobalUser, setIsLoggedIn } from '../slices';

function Profile(props) {
  const { appPage, signUpError, userName, onSignUp } = props;
  const isLoggedIn = useSelector((state) => state.control.isLoggedIn);

  // adding properties to state
  // const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allergy, setAllergy] = useState(null);
  const [diet, setDiet] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && appPage !== '/profile') {
      console.log('update Proile of ...', userName);
      // setProfileSettings(); //TBD ROUTE NEEDED...
      dispatch(setAppPage('/feature')); //REMOVE THIS ONCE ROUTE IS ADDED!
    }
  }, [isLoggedIn]);

  // send JSON file to the server
  // if (!isLoggedIn) { // get from server
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
  // }

  const setProfileSettings = () => {
    // update profile
    fetch('/profile/' + userName, {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        allergy,
        diet,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        res.json();
      })
      .then((data) => {
        console.log('profile updated:', data);
        if (!isLoggedIn) dispatch(setAppPage('/profile'));
      })
      .catch((err) => console.log(err));
  };

  const handleProfile = () => {
    if (!isLoggedIn) {
      onSignUp();
    } else {
      setProfileSettings();
    }
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
    e.preventDefault();
    // alert('changes have been made');
  };

  const handleExit = () => {
    dispatch(setAppPage('/feature'));
  };

  const signUpRender = (input) => {
    return (
      <div>
        {input}
        {signUpError ? <span>Signup Failed, Invalid Input</span> : null}
      </div>
    );
  };

  const editProfileRender = (input) => {
    return (
      <div>
        <h1>Edit My Profile</h1>
        <form onSubmit={handleSubmit} className='loginContainer'>
          {input}
          <button onClick={handleExit}>Home Page</button>
        </form>
      </div>
    );
  };

  const renderSettings = (
    <div>
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
        {isLoggedIn ? 'Update Profile' : 'Sign Up'}
      </button>
    </div>
  );

  if (!isLoggedIn) return signUpRender(renderSettings);
  else return editProfileRender(renderSettings);
}

export default Profile;

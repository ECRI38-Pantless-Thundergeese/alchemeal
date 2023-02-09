import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import TextBox from './TextBox';
import makeAnimated from 'react-select/animated';
import { useSelector, useDispatch } from 'react-redux';
import { setAppPage } from '../slices';

function Profile(props) {
  const { appPage, signUpError, userName, onSignUp, oAuth, oAuthHandler } =
    props;
  const isLoggedIn = useSelector((state) => state.control.isLoggedIn);
  const globalUser = useSelector((state) => state.control.globalUser);
  // adding properties to state
  // const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [allergy, setAllergy] = useState(null);
  const [diet, setDiet] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn && appPage !== '/profile') {
      console.log('update Proile of ...', globalUser);
      // setProfileSettings(); //TBD ROUTE NEEDED...
      dispatch(setAppPage('/feature')); //REMOVE THIS ONCE ROUTE IS ADDED!
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetch('/profile/all/' + globalUser)
        .then((res) => res.json())
        .then((data) => {
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setAllergy(data.allergy);
          setDiet(data.diet);
          console.log(data.firstName);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const setProfileSettings = () => {
    // update profile
    fetch('/profile/all/' + globalUser, {
      method: 'PATCH',
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
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
    { value: 'none', label: 'None' },
  ];

  const dietaryRestrictions = [
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'kosher', label: 'Kosher' },
    { value: 'none', label: 'None' },
  ];

  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event) => {
    setLastName(event.target.value);
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
      <tb>
        {input}
        {signUpError ? (
          <span>Signup Failed, Invalid Input</span>
        ) : (
          <span style={{ color: 'white' }}>''</span>
        )}
      </tb>
    );
  };

  const editProfileRender = (input) => {
    return (
      <div className='profileWrapper'>
        <form onSubmit={handleSubmit} className='profileContainer'>
          <h1>Edit My Profile</h1>
          {input}
          <div className='section-div'>
            <span className='divider'></span>
          </div>
          <button className='back' onClick={handleExit}>
            CANCEL
          </button>
        </form>
      </div>
    );
  };

  const renderSettings = (
    <div>
      <tb>
        <TextBox
          id='firstName'
          className='TextBox'
          labelClass='label'
          label='First Name'
          name='firstName'
          required={false}
          value={firstName}
          onChange={handleFirstName}
        />
        <TextBox
          id='lastName'
          className='TextBox'
          labelClass='label'
          label='Last Name'
          name='lastName'
          required={false}
          value={lastName}
          onChange={handleLastName}
        />
        <h2>Allergies</h2>
        <Select
          className='select'
          isMulti
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? '#e2ffe2' : 'salmon',
            }),
          }}
          id='allergy'
          options={allergies}
          value={allergy}
          onChange={handleChangeAllergy}
        />
        <h2>Diet</h2>
        <Select
          className='select'
          isMulti
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused ? '#e2ffe2' : 'salmon',
            }),
          }}
          options={dietaryRestrictions}
          value={diet}
          onChange={handleChangeDiet}
        />
        <button className='signup' onClick={handleProfile} type='submit'>
          {isLoggedIn ? 'UPDATE' : 'SIGN UP'}
        </button>
        {oAuth ? (
          <div class='google-btn' onClick={oAuthHandler}>
            <div class='google-icon-wrapper'>
              <img
                class='google-icon-svg'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
              />
            </div>
            <p class='btn-text'>
              <b>Sign up with Google</b>
            </p>
          </div>
        ) : null}
      </tb>
    </div>
  );

  if (!isLoggedIn) return signUpRender(renderSettings);
  else return editProfileRender(renderSettings);
}

export default Profile;

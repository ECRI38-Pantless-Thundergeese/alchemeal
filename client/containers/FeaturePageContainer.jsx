import React, { useState } from 'react';
import Table from '../components/Table';
import DropDown from '../components/DropDown';
import Cardlist from '../components/Cardlist';
import { resetApp, setAppPage, setViewOption } from '../slices';
import { useSelector, useDispatch } from 'react-redux';
const {
  tableProperties,
  tableHeaders,
  VIEWOPTS,
  UNIT_TYPES,
} = require('../../constants');
const { capitalizeWord } = require('../../utilities');

function FeatureContainer(props) {
  // const tableProperties = ['Insert', 'food', 'properties'];
  const globalUser = useSelector((state) => state.control.globalUser);
  const viewOption = useSelector((state) => state.control.viewOption);
  const [ailment, setAilment] = React.useState('headache');
  const [units, setUnits] = React.useState(UNIT_TYPES[0]);
  const { appPage } = props;
  const dispatch = useDispatch();

  const [foodEntries, setFoodEntries] = useState([]);

  const handleChange = (event) => {
    setAilment(event.target.value);
  };
  const handleViewOption = (event) => {
    dispatch(setViewOption(event.target.value));
  };
  const viewOptions = VIEWOPTS.map((elem, i) => (
    <option key={i} value={elem}>
      {capitalizeWord(elem)}
    </option>
  ));
  const unitOptions = UNIT_TYPES.map((elem, i) => (
    <option key={i} value={elem}>
      {capitalizeWord(elem)}
    </option>
  ));

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`);
        }
        dispatch(resetApp());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    // console.log('ailment', ailment);
    const logo = document.querySelector('.logo');
    logo.classList.toggle('flip');
    fetch('/search/' + globalUser, {
      method: 'POST',
      body: JSON.stringify({ ailment }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        // parse the data that has been sent back
        const parsedData = [];
        data.forEach((food) => {
          const foodRow = {
            name: food.ingredients[0].text,
            nutrients: [],
          };
          tableProperties.forEach((prop) => {
            foodRow.nutrients.push(food.totalNutrients[prop]);
          });
          parsedData.push(foodRow);
        });
        // console.log('parsedData', parsedData);
        setFoodEntries(parsedData);
      })
      .catch((err) => console.log(err));
  };

  // Jackson added this function
  const handleProfile = () => {
    console.log(globalUser);
    dispatch(setAppPage(`/profile`));
  };

  return (
    <>
      <nav>
        <h1>AlcheMeal</h1>
        <div className='logoutContainer'>
          <p>{globalUser}</p>
          <button onClick={handleProfile} className='logout'>
            Edit Profile
          </button>
          <button onClick={handleLogout} className='logout'>
            Logout
          </button>
        </div>
      </nav>

      <DropDown
        handleChange={handleChange}
        handleClick={handleClick}
        ailment={ailment}
      />
      <label className='viewopts' htmlFor='viewopts'>
        How would you like to view the data?
        <div className='viewselects'>
          <select
            name='viewopts'
            id='viewopts'
            value={viewOption}
            onChange={handleViewOption}
          >
            {viewOptions}
          </select>
          <select
            name='unitopts'
            id='unitopts'
            value={units}
            onChange={(e) => setUnits(e.target.value)}
          >
            {unitOptions}
          </select>
        </div>
      </label>
      {viewOption === 'Table' ? (
        <Table
          columns={tableHeaders}
          rows={foodEntries}
          dataProperties={tableProperties}
          units={units}
        />
      ) : (
        <Cardlist
          columns={tableHeaders}
          rows={foodEntries}
          dataProperties={tableProperties}
          units={units}
        />
      )}
    </>
  );
}

export default FeatureContainer;

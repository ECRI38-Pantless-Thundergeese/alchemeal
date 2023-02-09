import React, { useState } from 'react';
import Table from '../components/Table';
import DropDown from '../components/DropDown';
import Cardlist from '../components/Cardlist';
import { resetApp, setAppPage } from '../slices';
import { useSelector, useDispatch } from 'react-redux';

function FeatureContainer(props) {
  // const tableProperties = ['Insert', 'food', 'properties'];
  const globalUser = useSelector((state) => state.control.globalUser);
  const [ailment, setAilment] = React.useState('headache');
  const { appPage } = props;
  const dispatch = useDispatch();
  const tableProperties = [
    'CA',
    'K',
    'FE',
    'ZN',
    'VITA_RAE',
    'VITC',
    'VITB12',
    'VITD',
    'TOCPHA',
    'NIA',
  ];
  const tableHeaders = [
    'Name',
    'Calcium',
    'Potassium',
    'Iron',
    'Zinc',
    'Vitamin A',
    'Vitamin C',
    'Vitamin B-12',
    'Vitamin D',
    'Vitamin E',
    'Niacin',
  ];

  const [foodEntries, setFoodEntries] = useState([]);

  const handleChange = (event) => {
    setAilment(event.target.value);
  };

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
    console.log('ailment', ailment);
    fetch('/search/', {
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
        console.log('parsedData', parsedData);
        setFoodEntries(parsedData);git 
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
      <Table
        columns={tableHeaders}
        rows={foodEntries}
        dataProperties={tableProperties}
      />
      <Cardlist
        columns={tableHeaders}
        rows={foodEntries}
        dataProperties={tableProperties}
      />
    </>
  );
}

export default FeatureContainer;

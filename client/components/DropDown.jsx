/* eslint-disable react/prop-types */
import React from 'react';
const { AILMENTS } = require('../../constants');
const { capitalizeWord } = require('../../utilities');
function DropDown(props) {
  const { ailment, handleChange, handleClick } = props;
  const options = AILMENTS.map((elem, i) => (
    <option key={i} value={elem}>
      {capitalizeWord(elem)}
    </option>
  ));
  return (
    <div className='dropdown-container'>
      <div className='dropdown'>
        <label htmlFor='ailment'>
          What is your ailment?
          <select
            name='ailments'
            id='ailments'
            value={ailment}
            onChange={handleChange}
          >
            {options}
          </select>
          <button type='button' onClick={handleClick}>
            Submit
          </button>
        </label>
      </div>
    </div>
  );
}

export default DropDown;

/* eslint-disable react/jsx-one-expression-per-line */

import React, { useState, useEffect } from 'react';
const { vitaminDailyDosage } = require('../../constants');
import { searchImages } from 'pixabay-api';
const AUTH_KEY = process.env.PIXBAY_KEY;

function Card(props) {
  const { name, nutrients, units } = props;
  const [imgSRC, setImgSRC] = useState(null);

  useEffect(() => {
    const parsedName = name.split(' ').at(-1);
    getImageFromAPI(parsedName);
  }, [name]);

  const getImageFromAPI = (name) => {
    searchImages(AUTH_KEY, name + ' food')
      .then((obj) => {
        console.log(obj);
        if (
          'hits' in obj &&
          obj.hits.length > 0 &&
          'webformatURL' in obj.hits[0]
        ) {
          setImgSRC(obj.hits[0].webformatURL);
        }
      })
      .catch((err) => console.log(err));
  };

  const labelElement = (nutrient, i) => {
    if (units === 'Percentage') {
      return (
        <>
          <h4>{(nutrient.quantity / vitaminDailyDosage[i]).toFixed(2)} %</h4>
        </>
      );
    } else {
      return (
        <>
          <h4>
            {nutrient.quantity.toFixed(2)} {nutrient.unit}
          </h4>
        </>
      );
    }
  };

  const handleCardClick = (e) => {
    const stats = document.querySelector('#' + name.split(' ').at(-1));
    stats.classList.toggle('show');
  };

  console.log(nutrients[0]);
  return (
    <div className='card' onClick={handleCardClick}>
      <div className='name'>
        <div class='foodicon'>
          <h1> {name} </h1>
          <>{imgSRC ? <img src={imgSRC} /> : null}</>
        </div>
      </div>

      <h2>Nutrition Facts</h2>
      <section></section>
      <stats id={name.split(' ').at(-1)}>
        {units === 'Percentage' ? (
          <>
            <div>
              <h5> </h5>

              <h5>% Daily Value*</h5>
            </div>
            <subsection></subsection>
          </>
        ) : null}
        {nutrients.map((nutrient, i) => {
          if (nutrient === undefined) {
            return <h1></h1>;
          }
          return (
            <>
              <div>
                <h4>{nutrient.label}</h4>
                {labelElement(nutrient, i)}
              </div>
              <subsection></subsection>
            </>
          );
        })}
      </stats>
    </div>
  );
}
export default Card;

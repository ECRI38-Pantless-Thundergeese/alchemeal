/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';

function Card(props) {
  const { name, nutrients } = props;

console.log(nutrients[0])
  return (
    <div className="card">
      <div className="name">
        <h1> { name }  </h1>
      </div>

        <h2>Nutrition Facts</h2>
        {nutrients.map((nutrient, i) => {  
            if(nutrient === undefined){
              return <h1></h1>
            }
           return <div>
            <h4>{nutrient.label}</h4>
            <h4>{nutrient.quantity.toFixed(2)}{nutrient.unit}</h4> 
            </div>
          })}

    </div>
  );
}
export default Card;

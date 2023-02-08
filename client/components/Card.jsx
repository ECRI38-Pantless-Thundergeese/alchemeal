/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState, useEffect } from 'react';

function Card(props) {
  const { columns, rows, dataProperties } = props;
  const [foodData, setFoodData] = useState([]);
 console.log("THIS IS IN THE CARD",  columns, rows, dataProperties)
  
console.log('testing rows', rows[0])

// const tableBody = rows.map((row) => (
//       {[{row.name}, ...row.nutrients.map((property) => {
//         console.log('property', property);
//         if (!property) {
//           return N/A
//         }
//         return {`${property.quantity ? property.quantity.toFixed(2) : 0} ${property.unit}`}
//       },),]}
//   ));


  return (
    <div className="card">
      <div className="name">
        <h1> Food:  </h1>
      </div>
      <ul className="detailsList">
        <h2>Nutrition Facts</h2>
        {columns.slice(1).map((header, property) => (
          <li key={property}>{header}: {`${property.quantity}`} </li>
        ))}
      </ul>
    </div>
  );
}
export default Card;

import React from 'react';
import Card from './Card';
/* eslint-disable react/prop-types */

function Cardlist(props) {
  const { columns, rows, dataProperties } = props;
  
  return (
    <div className="cardContainer">
      {rows.map((fooditem, i) => (
        <Card key={i}
          name={fooditem.name}
          nutrients={fooditem.nutrients}
        />
      ))}
    </div>
  );
}

export default Cardlist;

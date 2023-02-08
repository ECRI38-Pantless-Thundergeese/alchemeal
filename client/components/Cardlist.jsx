import React from 'react';
import Card from './Card';
/* eslint-disable react/prop-types */

function Cardlist(props) {
  const { columns, rows, dataProperties } = props;

  return (
    <div className="cardContainer">
      {[...columns].map((_, i) => (
        <Card key={i}
          columns={columns}
          rows={rows}
          dataProperties={dataProperties}
        />
      ))}
    </div>
  );
}

export default Cardlist;

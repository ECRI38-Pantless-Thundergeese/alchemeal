/* eslint-disable react/prop-types */
import React from 'react';
const { vitaminDailyDosage } = require('../../constants');

function Table(props) {
  // Data

  const { columns, rows, dataProperties, units } = props;
  const tableHeaders = (
    <thead>
      <tr>
        {columns !== undefined
          ? columns.map((column) => <th>{column}</th>)
          : null}
      </tr>
    </thead>
  );
  const labelElement = (property, i) => {
    if (units === 'Percentage') {
      return <>{(property.quantity / vitaminDailyDosage[i]).toFixed(2)} %</>;
    } else {
      return (
        <>
          {`${property.quantity ? property.quantity.toFixed(2) : 0} ${
            property.unit
          }`}
        </>
      );
    }
  };
  // row is the particular food object
  // add name
  // iterate over nutrients
  // add a cell for each nutrient
  // wrap quantity+unit in a td tag
  const tableBody = [];
  if (rows !== undefined) {
    tableBody.push(
      rows.map((row) => (
        <tr>
          {[
            <td>{row.name}</td>,
            ...row.nutrients.map((property, i) => {
              console.log('property', property);
              if (!property) {
                return <td>N/A</td>;
              }
              return <td>{labelElement(property, i)}</td>;
            }),
          ]}
        </tr>
      ))
    );
  }

  return (
    <table className='styled-table' width='100%'>
      {tableHeaders}
      <tbody>{tableBody}</tbody>
    </table>
  );
}

export default Table;

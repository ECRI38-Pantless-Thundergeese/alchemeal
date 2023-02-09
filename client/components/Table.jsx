/* eslint-disable react/prop-types */
import React from 'react';

function Table(props) {
  // Data
  const { columns, rows, dataProperties } = props;
  const tableHeaders = (
    <thead>
      <tr>
        {columns.map((column) => <th>{column}</th>)}
      </tr>
    </thead>
  );
  // row is the particular food object
    // add name
    // iterate over nutrients
  // add a cell for each nutrient
  // wrap quantity+unit in a td tag

  const tableBody = rows.map((row) => (
    <tr>

      {[<td>{row.name}</td>, ...row.nutrients.map((property) => {
        console.log('property', property);
        if (!property) {
          return <td>N/A</td>;
        }
        return <td>{`${property.quantity ? property.quantity.toFixed(2) : 0} ${property.unit}`}</td>;
      },
      ),
      ]}
    </tr>
  ));

  return (
    <table className="styled-table" width="100%">
      {tableHeaders}
      <tbody>
        {tableBody}
      </tbody>
    </table>
  );
}

export default Table;

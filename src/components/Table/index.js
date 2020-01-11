import React from 'react';
import './index.scss';

const Table = ({ dataSource, columns }) => {
  let columnArr = [];
  columns.map((col) => {
    columnArr.push(col.dataIndex);
  });
  return (
    <table className="codio-table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((data, i) => {
          return (
            <tr key={i}>
              {columnArr.map((col, j) => (
                <td key={`tr${i}_td${j}`}>{data[col]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;

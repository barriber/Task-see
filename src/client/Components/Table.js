import React, { memo } from "react";

const Table = ({ colDef, data }) => {
  if (data.length === 0) {
    return <h1>No Data</h1>;
  }
  return (
    <div style={{ marginTop: 20 }}>
      <div className="header" style={{ display: "flex" }}>
        {colDef.map(({ field, width }) => {
          return (
            <h5 key={field} style={{ flex: `1 0 ${width}px` }}>
              {field}
            </h5>
          );
        })}
      </div>
      <div className="body" style={{ height: 500, overflow: "auto" }}>
        {data.map((row, index) => {
          return (
            <div
              className="row"
              style={{ display: "flex", marginBottom: 10 }}
              key={index}
            >
              {colDef.map(({ width, field, format }) => {
                return (
                  <div key={field} style={{ flex: `1 0 ${width}px`, justifyContent: 'center', display: 'flex' }}>
                    {format ? format({value: row[field], data: row }) : row[field]}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;

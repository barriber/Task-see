import React, { useEffect, useState } from "react";
import "./App.css";
import AlertsForm from "./client/Components/AlertsForm";
import Table from "./client/Components/Table";
import CurrentTime from "./client/Components/CurrentTime";

const colDef = [
  {
    field: "city",
    width: 100,
  },
  { field: "currentTemp", width: 100 },
  { field: "condition", width: 100 },
  {
    field: "createdAt",
    width: 100,
    format: ({ value }) => {
      const date = new Date(value);
      return date.toLocaleString();
    },
  },
  {
    field: "status",
    width: 100,
    format: ({ data }) => {
      const { condition, currentTemp } = data;
      const conditionNumber = condition.slice(1);
      if (condition[0] === "=") {
        return currentTemp === conditionNumber ? (
          <div className="alert red" />
        ) : (
          <div className="alert green" />
        );
      }
      if (condition[0] === "<") {
        return currentTemp < conditionNumber ? (
          <div className="alert red" />
        ) : (
          <div className="alert green" />
        );
      }

      if (condition[0] === ">") {
        return currentTemp > conditionNumber ? (
          <div className="alert red" />
        ) : (
          <div className="alert green" />
        );
      }
    },
  },
];
function App() {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000)
  }, [setLoading, alerts]);
  return (
    <div className="App">
      <CurrentTime />
      <AlertsForm setAlerts={setAlerts} setLoading={setLoading} />
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <Table colDef={colDef} data={alerts} />
      )}
    </div>
  );
}

export default App;

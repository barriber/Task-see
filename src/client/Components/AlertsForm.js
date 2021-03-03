import { useCallback } from "react";
import axios from "axios";

const AlertsForm = ({ setAlerts, setLoading }) => {
  const onChangeHandler = useCallback(
    async (e) => {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

      await axios.post("api/alerts", formData);
      const { data } = await axios.get("api/alerts");
      data.forEach((alert) => {
        alert.currentTemp = Math.floor(Math.random() * (50 - -50 + 1) + -50);
      });
      setAlerts(data);
      setLoading(false);
    },
    [setAlerts, setLoading]
  );
  return (
    <input
      type="file"
      accept=".csv"
      name="file"
      onChange={onChangeHandler}
      onClick={(e) => {
        e.target.value = null;
      }}
    />
  );
};

export default AlertsForm;

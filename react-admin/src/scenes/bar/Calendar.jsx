import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { getDateSell } from "../../api/getDate";
import useBakeryStore from "../../zustand/storage";
import { getDataLineChart } from "../../api/tracking";

export default function Calendar() {
  const { queryForm, setQueryForm, setData, setDataLine } = useBakeryStore();

  const fetchDate = async () => {
    try {
      const getDate = await getDateSell(queryForm);
      setData(getDate.data); // <-- Save data in Zustand
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  
  const fecthDataLine = async () => {
    try {
      const getDataLine = await getDataLineChart(queryForm)
      setDataLine(getDataLine.data)
    }catch(err){
      console.log(err)
    }
  }

  React.useEffect(() => {
    if (queryForm.startDate && queryForm.endDate) {
      fetchDate();
      fecthDataLine()
    }
  }, [queryForm.startDate, queryForm.endDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ display: "flex", gap: "10px" }}>
        <DatePicker
          label="Start Date"
          value={queryForm.startDate ? dayjs(queryForm.startDate) : null}
          onChange={(newValue) => setQueryForm("startDate", newValue)}
        />
        <DatePicker
          label="End Date"
          value={queryForm.endDate ? dayjs(queryForm.endDate) : null}
          onChange={(newValue) => setQueryForm("endDate", newValue)}
        />
      </div>
    </LocalizationProvider>
  );
}

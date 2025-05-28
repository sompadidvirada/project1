import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function Calendar({ setSelectFormtracksell,setSelectDateBrachCheck }) {
  const [value, setValue] = React.useState(null);


  const handleDateChange = (newValue) => {
    setValue(newValue);

    if (newValue) {
      const formattedDate = dayjs(newValue).hour(8).minute(0).second(0).format("YYYY-MM-DDTHH:mm:ss");
      setSelectFormtracksell((prevState) => ({
        ...prevState,
        sellAt: formattedDate,
      }));
      setSelectDateBrachCheck((prevState) => ({
        ...prevState,
        sellDate: formattedDate,
      }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={value} onChange={handleDateChange} />
    </LocalizationProvider>
  );
}

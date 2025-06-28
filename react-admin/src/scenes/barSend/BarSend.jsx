import { Box } from "@mui/material";
import Header from "../../component/Header";
import useBakeryStore from "../../zustand/storage";
import BarChartSend from "../../component/BarChartSend";
import Calendar from "../bar/Calendar";

const BarSend = () => {
  const data = useBakeryStore((state) => state.dataSend); // Get data from Zustand

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box
      sx={{mt:"20px"}}
      >
        <Calendar />
      </Box>
      <Box height="75vh">
        <BarChartSend data={data} />
      </Box>
    </Box>
  );
};


export default BarSend;
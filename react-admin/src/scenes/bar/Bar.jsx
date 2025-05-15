import { Box } from "@mui/material";
import Header from "../../component/Header";
import BarChart from "../../component/BarChart";
import Calendar from "./Calendar";
import useBakeryStore from "../../zustand/storage";

const Bar = () => {
  const data = useBakeryStore((state) => state.data); // Get data from Zustand

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box
      sx={{mt:"20px"}}
      >
        <Calendar />
      </Box>
      <Box height="75vh">
        <BarChart data={data} />
      </Box>
    </Box>
  );
};


export default Bar;
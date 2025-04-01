import { Box } from "@mui/material";
import Header from "../../component/Header";
import LineChart from "../../component/LineChart";
import Calendar from "../bar/Calendar";

const Line = ({dataLine}) => {
  return (
    <Box m="20px"
    overflow="none"
    >
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box
      sx={{mt:"20px"}}
      >
        <Calendar />
      </Box>
      
      <Box height="75vh">
        <LineChart dataLine={dataLine}/>
      </Box>
    </Box>
  );
};

export default Line;
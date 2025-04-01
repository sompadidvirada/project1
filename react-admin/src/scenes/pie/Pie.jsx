import { Box } from "@mui/material";
import Header from "../../component/Header";
import PieChart from "../../component/PieChart";
import Calendar from "../bar/Calendar";
import useBakeryStore from "../../zustand/storage";

const Pie = () => {
  const dataPie = useBakeryStore((state)=>state.dataPie)
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box sx={{ mt: "20px" }}>
        <Calendar />
      </Box>
      <Box height="75vh">
        <PieChart dataPie={dataPie}/>
      </Box>
    </Box>
  );
};

export default Pie;

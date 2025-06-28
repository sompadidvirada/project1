import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../component/Header";
import LineChart from "../../component/LineChart";
import BarChart from "../../component/BarChart";
import StatBox from "../../component/StatBox";
import useBakeryStore from "../../zustand/storage";
import Calendar from "../bar/Calendar";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { getTotalSell } from "../../api/tracking";
import { useEffect, useState } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import PieChart from "../../component/PieChart";
import BarChartSend from "../../component/BarChartSend";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data = [],
    dataSend = [],
    dataExp = [],
    token,
    queryForm,
    getBrach,
    getProducts,
    getCategory,
    products,
  } = useBakeryStore();
  const [totalSell, setTotalSell] = useState(null);
  const dataLine = useBakeryStore((state) => state.dataLine);
  const dataPie = useBakeryStore((state) => state.dataPie);

  //Function....

  useEffect(() => {
    getBrach();
    getProducts();
    getCategory();
  }, [token]);

  const fecthTotalSell = async () => {
    try {
      if (queryForm) {
        const res = await getTotalSell(queryForm, token);
        setTotalSell(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fecthTotalSell();
  }, [token, queryForm]);

  return (
    <Box m="20px" sx={{
      width: "98%",
      height: "100vw",
      overflow: "none"
    }}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Calendar />
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            height: "100%",
            textDecoration: "none", // Ensure no underline
          }}
        >
          <StatBox
            title={
              <Typography variant="laoText">
                {totalSell ? totalSell.totalSellPrice.toLocaleString() : 0} ກີບ
              </Typography>
            }
            subtitle={
              <Typography variant="laoText">ຍອດຂາຍທັງຫມົດທຸກສາຂາ</Typography>
            }
            progress={totalSell ? totalSell.totalSellPrice : "0.1"}
            icon={
              <LocalAtmIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            height: "100%",
            textDecoration: "none", // Ensure no underline
          }}
        >
          <StatBox
            title={
              <Typography variant="laoText">
                {totalSell ? totalSell.totalSendPrice.toLocaleString() : 0} ກີບ
              </Typography>
            }
            subtitle={
              <Typography variant="laoText">
                ຍອດຈັດສົ່ງທັງຫມົດທຸກສາຂາ
              </Typography>
            }
            enable={true}
            icon={
              <LocalShippingIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            height: "100%",
            textDecoration: "none", // Ensure no underline
          }}
        >
          <StatBox
            title={
              <Typography variant="laoText">
                {totalSell ? totalSell.totalExpPrice.toLocaleString() : 0} ກີບ
              </Typography>
            }
            subtitle={
              <Typography variant="laoText">
                ຍອດຫມົດອາຍຸທັງຫມົດທຸກສາຂາ
              </Typography>
            }
            enable={true}
            icon={
              <DeleteForeverIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "100%",
            height: "100%",
            textDecoration: "none", // Ensure no underline
          }}
        >
          <StatBox
            title={
              <Typography variant="laoText">
                {!totalSell || totalSell.percentageOfPricetotalExp === null
                  ? "0"
                  : totalSell.percentageOfPricetotalExp}{" "}
                %
              </Typography>
            }
            subtitle={
              <Typography variant="laoText">ເປີເຊັນຍອດໝົດອາຍຸ ທຽບຍອດຈັດສົ່ງ</Typography>
            }
            icon={
              <SsidChartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
            >
              <Typography
                variant="laoText"
                fontWeight="600"
                color={colors.grey[100]}
                sx={{
                  paddingBottom:"10px"
                }}
              >
                ຍອດຂາຍເປັນວັນ ຈັນ-ອາທິດ ຂອງທຸກສາຂາ
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {dataLine && dataLine.length > 0 ? (
              <LineChart
                isDashboard={true}
                dataLine={dataLine}
                products={products}
              />
            ) : (
              <Typography marginTop="80px" variant="h2" textAlign="center">
                No data available please select date first...
              </Typography>
            )}
          </Box>
        </Box>

        {/* ROW 3 */}

        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          textAlign="center"
        >
          <Typography variant="laoText" fontWeight="600" fontSize={15}>
            ຍອດຂາຍແຕ່ລະສາຂາ
          </Typography>
          <Box height="100%" mt="-20px">
            {data && data.length > 0 ? (
              <BarChart isDashboard={true} data={data} />
            ) : (
              <Typography variant="h2" marginTop="80px">
                No data available please select date first...
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          textAlign="center"
        >
          <Typography variant="laoText" fontWeight="600" fontSize={15}>
            ຍອດໝົດຈັດສົ່ງແຕ່ລະສາຂາ
          </Typography>
          <Box height="100%" mt="-20px">
            {dataSend && dataSend.length > 0 ? (
              <BarChartSend isDashboard={true} data={dataSend} />
            ) : (
              <Typography variant="h2" marginTop="80px">
                No data available please select date first...
              </Typography>
            )}
          </Box>
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          textAlign="center"
        >
          <Typography variant="laoText" fontWeight="600" fontSize={15}>
            ຍອດໝົດອາຍຸແຕ່ລະສາຂາ
          </Typography>
          <Box height="100%" mt="-20px">
            {dataExp && dataExp.length > 0 ? (
              <BarChartSend isDashboard={true} data={dataExp} />
            ) : (
              <Typography variant="h2" marginTop="80px">
                No data available please select date first...
              </Typography>
            )}
          </Box>
        </Box>

        {/* ROW 4 */}

        <Box
          gridColumn="span 12"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          textAlign="center"
          gap="50px"
          paddingTop="50px"
        >
          <Typography variant="laoText" fontWeight="600" sx={{
          }}>
            ຍອດຂອງແຕ່ລະລາຍການທຸກສາຂາ
          </Typography>
          <Box height="100%">
            {dataPie && dataPie?.length > 0 ? (
              <PieChart isDashboard={true} dataPie={dataPie} />
            ) : (
              <Typography variant="h2" marginTop="80px">
                No data available please select date first...
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

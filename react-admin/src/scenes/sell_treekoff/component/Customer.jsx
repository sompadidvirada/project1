import {
  Avatar,
  Box,
  Button,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
} from "@mui/material";

const Customer = () => {
  const rows = [
    {
      name: "ທ້າວ ອາດອຟ ນິກເລີ",
      billId: 30,
      totalMenu: "10",
      totalPrice: "120,000",
      status: "avalive",
      update: "01",
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap="40px">
      {/* Seacrh Customer Section. */}
      <Box>
        {/* Search Area */}
        <Box display="flex" alignContent="center">
          <SearchIcon sx={{ fontSize: 35 }} />
          <Typography
            variant="laoText"
            fontSize={25}
            sx={{ alignItems: "center" }}
          >
            ຄົ້ນຫາບັນຊີລູກຄ້າ
          </Typography>
        </Box>
        <form>
          <Box display="flex" gap="10px">
            <input
              type="number"
              name="seacrhCustomer"
              placeholder="ລະບຸຂໍ້ມູນລູກຄ້າ..."
              style={{
                fontFamily: "Noto Sans Lao",
                fontSize: "20px",
                padding: "8px",
                width: "30%",
              }}
            />
            <Button variant="outlined" sx={{ height: 50 }}>
              <SearchIcon sx={{ fontSize: 20 }} />
              <Typography variant="laoText" fontWeight="bold">
                ຄົ້ນຫາ
              </Typography>
            </Button>
            <Button variant="contained" sx={{ height: 50, bgcolor: "#00a65a" }}>
              <Typography variant="laoText" fontWeight="bold">
                ສ້າງບິນໃຫ່ມ
              </Typography>
            </Button>
            <Button variant="contained" sx={{ height: 50, bgcolor: "#3c8dbc" }}>
              <Typography variant="laoText" fontWeight="bold">
                ສ້າງບິນໃຫ່ມບໍ່ມີໄອດີ
              </Typography>
            </Button>
          </Box>
        </form>

        {/** Output Area */}

        <Box
          sx={{
            p: "20px",
          }}
        >
          <Typography variant="laoText" fontSize={25}>
            ຜົນການຄົ້ນຫາ
          </Typography>

          {/** Table Detail User Area */}

          <Box>
            <Grid2
              container
              spacing={0.2}
              fontFamily="Noto Sans Lao"
              display="flex"
              flexDirection="column"
            >
              {/* Row: Image */}
              <Grid2 container item xs={12} alignItems="center" gap={30}>
                <Grid2 item xs={2}>
                  <Typography color="gray" variant="laoText" fontSize={30}>
                    ຮູບ:
                  </Typography>
                </Grid2>
                <Grid2 item xs={10}>
                  <Avatar
                    src="/assests/user.png"
                    alt="Pao"
                    sx={{ width: 120, height: 120 }}
                  />
                </Grid2>
              </Grid2>

              {/* Row: ID */}
              <Grid2 container item xs={12} alignItems="center" gap={33}>
                <Grid2 item xs={2}>
                  <Typography color="gray" fontSize={30} variant="laoText">
                    ID:
                  </Typography>
                </Grid2>
                <Grid2 item xs={10}>
                  <Typography fontWeight="bold" fontSize={30} variant="laoText">
                    9
                  </Typography>
                </Grid2>
              </Grid2>
              {/* Row: Name */}
              <Grid2 container item xs={12} alignItems="center" gap={35}>
                <Grid2 item xs={2}>
                  <Typography color="gray" variant="laoText" fontSize={30}>
                    ຊື່:
                  </Typography>
                </Grid2>
                <Grid2 item xs={10}>
                  <Typography variant="laoText" fontSize={30}>
                    ທ້າວ ອາດອຟ ນິກເລີ
                  </Typography>
                </Grid2>
              </Grid2>

              {/* Row: Phone */}
              <Grid2 container item xs={12} alignItems="center" gap={30}>
                <Grid2 item xs={2}>
                  <Typography color="gray" variant="laoText" fontSize={30}>
                    ເບີໂທ:
                  </Typography>
                </Grid2>
                <Grid2 item xs={10}>
                  <Typography fontSize={30} variant="laoText">
                    51778411
                  </Typography>
                </Grid2>
              </Grid2>

              {/* Row: Points */}
              <Grid2 container item xs={12} alignItems="center" gap={22}>
                <Grid2 item xs={2}>
                  <Typography color="gray" variant="laoText" fontSize={30}>
                    ແຕ້ມສະສົມ:
                  </Typography>
                </Grid2>
                <Grid2 item xs={10}>
                  <Typography
                    color="green"
                    sx={{ textDecoration: "underline" }}
                    fontSize={30}
                    variant="laoText"
                  >
                    6,000,000 ແຕ້ມ
                  </Typography>
                </Grid2>
              </Grid2>

              {/* Row: Total Sales */}
              <Grid2 container item xs={12} alignItems="center" gap={23}>
                <Grid2 item xs={2}>
                  <Typography color="gray" variant="laoText" fontSize={30}>
                    ມູນຄ່າຂາຍ:
                  </Typography>
                </Grid2>
                <Grid2 item xs={10}>
                  <Typography fontSize={30} variant="laoText">
                    3,828,000 KIP
                  </Typography>
                </Grid2>
              </Grid2>

              {/* Row: Join Time */}
              <Grid2 container item xs={12} alignItems="center" gap={23}>
                <Grid2 item xs={2}>
                  <Typography color="gray" variant="laoText" fontSize={30}>
                    ເວລາຮ່ວມ:
                  </Typography>
                </Grid2>
                <Grid2 item xs={10}>
                  <Typography fontSize={30} variant="laoText">
                    12:00am 01/09/1939
                  </Typography>
                </Grid2>
              </Grid2>
            </Grid2>
          </Box>

          {/** Table History Bill user */}
          <Box p={2}>
            <Typography variant="laoText">
              ບິນລາຍການທີ່ຍັງບໍ່ສຳເລັດລ່າສຸດ:
            </Typography>
            <TableContainer component={Paper} sx={{}}>
              <Table>
                <TableHead sx={{ backgroundColor: "white" }}>
                  <TableRow>
                    <TableCell sx={{ color: "black" }}>
                      <strong>Date</strong>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>
                      <strong>BILL ID</strong>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>
                      <strong>TOTAL MENU</strong>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>
                      <strong>TOTAL PRICE</strong>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>
                      <strong>STATUS</strong>
                    </TableCell>
                    <TableCell sx={{ color: "black" }}>
                      <strong>UPDATE</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
  {rows.map((row, index) => (
    <TableRow key={index} sx={{ backgroundColor: 'white'}}>
      <TableCell sx={{ color: 'black' }}><Typography variant="laoText">{row.name}</Typography></TableCell>
      <TableCell sx={{ color: 'black' }}><Typography variant="laoText">{row.billId}</Typography></TableCell>
      <TableCell sx={{ color: 'black' }}><Typography variant="laoText">{row.totalMenu}</Typography></TableCell>
      <TableCell sx={{ color: 'black' }}><Typography variant="laoText">{row.totalPrice}</Typography></TableCell>
      <TableCell sx={{ color: 'black' }}><Typography variant="laoText">{row.status}</Typography></TableCell>
      <TableCell sx={{ color: 'black' }}><Typography variant="laoText">{row.update}</Typography></TableCell>
    </TableRow>
  ))}
</TableBody>

              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      {/* Register for new Customer. */}

      <Box>
        <Box display="flex" alignContent="center">
          <AddIcon sx={{ fontSize: 35, color: "#3c8dbc" }} />
          <Typography
            variant="laoText"
            fontSize={25}
            sx={{ alignItems: "center", color: "#3c8dbc" }}
          >
            ສະໝັກສະມາຊິກໃໝ່:
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Typography variant="laoText">
            ກະລຸນາໃສ່ຂໍ້ມູນບັນຊີຂອງທ່ານ:
          </Typography>

          <form>
            <Box display="flex" flexDirection="column" gap="20px">
              <Box>
                <Typography variant="laoText" sx={{ fontSize: 30 }}>
                  ຊື່ :{" "}
                </Typography>
                <input
                  type="number"
                  name="username"
                  placeholder="ລະບຸຂໍ້ຊື່ລູກຄ້າ..."
                  style={{
                    fontFamily: "Noto Sans Lao",
                    fontSize: "20px",
                    padding: "8px",
                    width: "30%",
                    marginLeft: "60px",
                  }}
                />
              </Box>
              <Box>
                <Typography variant="laoText" sx={{ fontSize: 30 }}>
                  ເບີໂທ :
                </Typography>
                <input
                  type="number"
                  name="username"
                  placeholder="ລະບຸຂໍ້ເບີໂທລູກຄ້າ..."
                  style={{
                    fontFamily: "Noto Sans Lao",
                    fontSize: "20px",
                    padding: "8px",
                    width: "30%",
                    marginLeft: "26px",
                  }}
                />
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{ height: 50, bgcolor: "#00a65a", mt: "15px" }}
            >
              <Typography variant="laoText" fontWeight="bold">
                ສົ່ງຟອມ
              </Typography>
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Customer;

import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Checkbox,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import useTreekoffStorage from "../../../zustand/storageTreekoff";
import { useNavigate } from "react-router-dom";

const CheckBill = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [moneyReceived, setMoneyReciept] = useState("");
  const [rows, setRows] = useState([
    {
      id: 1,
      order: 1,
      menu: "HOT AMERICANO",
      price: 12000,
      qty: 1,
      img: "/assests/hot-Americano.jpg",
    },
    {
      id: 2,
      order: 1,
      menu: "HOT ESSPRESSO",
      price: 10000,
      qty: 2,
      img: "/assests/hot-Americano.jpg",
    },
    {
      id: 3,
      order: 1,
      menu: "HOT LATTE",
      price: 16000,
      qty: 4,
      img: "/assests/hot-Americano.jpg",
    },
    {
      id: 4,
      order: 1,
      menu: "HOT CAPPUCINO",
      price: 18000,
      qty: 3,
      img: "/assests/hot-Americano.jpg",
    },
    {
      id: 5,
      order: 1,
      menu: "HOT GREENTEA",
      price: 22000,
      qty: 6,
      img: "/assests/hot-Americano.jpg",
    },
    {
      id: 6,
      order: 1,
      menu: "HOT MOCHA",
      price: 32000,
      qty: 2,
      img: "/assests/hot-Americano.jpg",
    },
  ]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const userInfo = useTreekoffStorage((s) => s.userInfo);
  const userBill = useTreekoffStorage((s) => s.userBill);
  const resetBill = useTreekoffStorage((s) => s.resetBill);

  const handleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleChange = (e) => {
    const raw = e.target.value.replace(/,/g, ""); // remove commas
    if (!isNaN(raw)) {
      const number = parseInt(raw, 10);
      if (!isNaN(number)) {
        setMoneyReciept(number.toLocaleString()); // format with commas
      } else {
        setMoneyReciept("");
      }
    }
  };

  const totalSum = userBill.reduce((acc, row) => acc + row.price * row.qty, 0);

  const confirmClearBill = () => {
    resetBill();
    setOpenConfirm(false);
    navigate("/selltreekoff");
  };
  const handleClearBill = () => {
    setOpenConfirm(true);
  };
  return (
    <Box>
      {/** STATUS SECTIION */}
      <Box display="flex">
        <CheckIcon
          sx={{ fontSize: 27, alignSelf: "center", color: "rgb(59, 146, 37)" }}
        />
        <Typography fontWeight="bold" fontSize={16} color="rgb(59, 146, 37)">
          PAYMENT CHECKOUT
        </Typography>
      </Box>

      {/**DETAIL USER AND PAYMENT METHOD SECTION */}

      <Box display="flex">
        <Box width="70%">
          <Box
            sx={{
              padding: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Box display="flex" alignContent="center">
                  <Avatar
                    src={userInfo?.image || ""}
                    alt="Pao"
                    style={{ width: 80, height: 80 }}
                  />
                </Box>
                <Typography fontFamily="Noto Sans Lao" fontSize={18}>
                  CUSTOMER NAME: {userInfo?.username || "UNKNOW"}
                </Typography>
                <Typography fontSize={18}>
                  CUSTOMER ID: {userInfo?.id || 0}
                </Typography>
                <Typography fontSize={18}>
                  BILL NO: #{userInfo?.bill[0]?.id || 0} | TIME{" "}
                  {userInfo?.bill[0]?.billDate || "UNKNOW"}
                </Typography>
                <Typography
                  fontFamily="Noto Sans Lao"
                  fontSize={20}
                  color="rgb(26, 167, 8)"
                  fontWeight="bold"
                >
                  ແຕ້ມສະສົມ: {(userInfo?.point || 0).toLocaleString()} ຄະແນນ
                </Typography>
              </Box>
            </Box>

            <Box>
              <Paper sx={{ marginTop: 0, height: 250, overflow: "auto" }}>
                <Table>
                  <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.29)" }}>
                    <TableRow>
                      <TableCell>ORDERS</TableCell>
                      <TableCell>MENU</TableCell>
                      <TableCell>Price (KIP)/UNIT</TableCell>
                      <TableCell>QTY</TableCell>
                      <TableCell>TOTAL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userBill?.map((row, index) => {
                      const isSelected = selected.includes(row.id);
                      return (
                        <TableRow
                          key={row.id}
                          onClick={() => handleSelect(row.id)}
                          sx={{
                            cursor: "pointer",
                            backgroundColor: isSelected
                              ? "#e3f2fd"
                              : "transparent", // 🔷 highlight
                          }}
                        >
                          <TableCell>{index + 1}</TableCell>
                          <TableCell
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontWeight: "bold",
                            }}
                          >
                            <img
                              src={row.img}
                              alt={row.menu}
                              style={{
                                width: 40,
                                height: 40,
                                objectFit: "cover",
                                borderRadius: 4,
                                marginRight: 10,
                              }}
                            />
                            {row.menu}
                          </TableCell>
                          <TableCell>{row.price.toLocaleString()}</TableCell>
                          <TableCell>{row.qty}</TableCell>
                          <TableCell>
                            {(row.price * row.qty).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignContent="center"
          width="30%"
        >
          <Box>
            <Box display="flex" alignContent="center" justifyContent="center">
              <ArrowForwardIcon sx={{ fontSize: 25, alignSelf: "center" }} />
              <Typography variant="laoText" fontSize={25}>
                ຮັບເງິນຈາກລູກຄ້າ:
              </Typography>
            </Box>
            <Box borderBottom="1px solid rgba(1, 1, 1, 0.21)" padding={2}>
              <input
                type="text" // ← change from "number" to "text"
                name="moneyReciept"
                placeholder="ຮັບເງີນຈາກລູກຄ້າ (ກີບ)...."
                value={moneyReceived}
                onChange={handleChange}
                onWheel={(e) => e.target.blur()} // 👈 prevent scroll change
                style={{
                  fontFamily: "Noto Sans Lao",
                  fontSize: "20px",
                  padding: "8px",
                  width: "100%",
                }}
              />
            </Box>
          </Box>
          <Box display="flex" p={2} gap={2} justifyContent="center" height={70}>
            <Button
              variant="contained"
              color="success"
              sx={{ fontFamily: "Noto Sans Lao", fontSize: "13px" }}
            >
              ຈ່າຍເງີນ
            </Button>
            <Button
              sx={{
                border: "1px solid black",
                fontFamily: "Noto Sans Lao",
                fontSize: "12px",
                width: 150,
                fontWeight: "bold",
                gap: 1,
              }}
            >
              {<img src="/assests/bcel.png" style={{ width: 25 }} />}ຈ່າຍຜ່ານ
              ONE PAY
            </Button>
            <Button
              onClick={() => handleClearBill()}
              sx={{
                border: "1px solid black",
                fontFamily: "Noto Sans Lao",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {<DeleteIcon />}ຍົກເລີກບິນ
            </Button>
          </Box>
          <Box marginTop={32}>
            <Box display="flex" justifyContent="center" gap={5}>
              <Typography sx={{ fontSize: 30 }}>CASH</Typography>
              <Typography sx={{ fontSize: 30 }}>
                {moneyReceived ? moneyReceived + " KIP" : "0"}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" gap={5}>
              <Typography sx={{ fontSize: 32, color: "red" }}>TOTAL</Typography>
              <Typography sx={{ fontSize: 32, color: "red" }}>
                {totalSum ? totalSum.toLocaleString() + " KIP" : "0"}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" gap={5}>
              <Typography sx={{ fontSize: 35, color: "rgb(59, 146, 37)" }}>
                CHANGE
              </Typography>
              <Typography sx={{ fontSize: 35, color: "rgb(59, 146, 37)" }}>
                {(() => {
                  const rawMoney = parseInt(
                    moneyReceived.replace(/,/g, ""),
                    10
                  );
                  if (isNaN(rawMoney)) return "0";
                  return (rawMoney - totalSum).toLocaleString() + " KIP";
                })()}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <Box p={3}>
          <Typography fontFamily="Noto Sans Lao" fontSize={18} mb={2}>
            ທ່ານແນ່ໃຈບໍ່ວ່າຈະຍົກເລີກບິນນີ້?
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={() => setOpenConfirm(false)}>ຍົກເລີກ</Button>
            <Button
              variant="contained"
              color="error"
              onClick={confirmClearBill}
            >
              ຢືນຢັນ
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default CheckBill;

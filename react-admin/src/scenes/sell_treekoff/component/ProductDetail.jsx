import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl,
  Grid2,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import MonitorIcon from "@mui/icons-material/Monitor";
import { useEffect, useState } from "react";
import { products } from "../data/MockData";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useLocation } from "react-router-dom";
import useTreekoffStorage from "../../../zustand/storageTreekoff";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const userBill = useTreekoffStorage((state) => state.userBill);
  const setUserBill = useTreekoffStorage((s) => s.setUserBill);
  const replaceUserBill = useTreekoffStorage((s) => s.replaceUserBill);
  const userInfo = useTreekoffStorage((s) => s.userInfo);
  const setUserInfo = useTreekoffStorage((s) => s.setUserInfo);

  const [selectedItem, setSelectedItem] = useState(null);
  const data = products;
  const totalSum = userBill.reduce((acc, row) => acc + row.price * row.qty, 0);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState("ທຳມະດາ");
  const [quantity, setQuantity] = useState(1); // default is 1

  const categories = Object.keys(data);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (!userInfo || Object.keys(userInfo).length === 0) {
      setUserInfo({
        id: 9001,
        username: "USER_FOR_BRANCH_NO_ID_1",
        image: "",
        phonenumber: "",
        point: 0,
        totalSpent: 0,
        createDate: "",
        bill: [],
      });
    }
  }, [userInfo]);

  const handleClickOpen = (item) => {
    setSelectedItem(item); // store the clicked item
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuantity(1);
  };
  const handleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = () => {
    replaceUserBill(userBill.filter((row) => !selected.includes(row.id)));
    setSelected([]);
  };

  const handleDeleteAll = () => {
    replaceUserBill([]);
    setSelected([]);
  };

  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSubmitDialog = async (e) => {
    e.preventDefault();

    const price = Number(selectedItem?.price || 0);

    const newBill = {
      id: selectedItem?.id,
      menu: selectedItem?.menuName || "",
      price: price,
      qty: quantity,
      size: selectedItem?.size,
      img: selectedItem?.image || null,
      sweet: selectedValue || "ທຳມະດາ",
    };

    setUserBill(newBill); // persist to Zustand
    setQuantity(1);
    handleClose();
  };

  const handleCheckout = () => {
    if (!userBill || userBill.length === 0) {
      alert("NO ITEM IN BILL");
      return;
    } else {
      navigate("/selltreekoff/checkbill");
    }
  };
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Search Area */}
      <Box display="flex" alignContent="center" padding={2}>
        <SearchIcon sx={{ fontSize: 35 }} />
        <Typography
          variant="laoText"
          fontSize={25}
          sx={{ alignItems: "center" }}
        >
          ຄົ້ນຫາເມນູ
        </Typography>
      </Box>
      <form>
        <Box display="flex" gap="10px">
          <input
            type="number"
            name="seacrhCustomer"
            placeholder="ລະບຸຊື່ເມນູ..."
            style={{
              fontFamily: "Noto Sans Lao",
              fontSize: "20px",
              padding: "8px",
              width: "30%",
            }}
          />
          <Button variant="outlined" sx={{ height: 50 }}>
            <SearchIcon sx={{ fontSize: 20 }} />
            <Typography fontFamily="Noto Sans Lao" fontWeight="bold">
              ຄົ້ນຫາ
            </Typography>
          </Button>
          <Button
            variant="contained"
            sx={{ height: 50, bgcolor: "#00a65a" }}
            onClick={() => handleCheckout()}
          >
            <LocalAtmIcon />
            <Typography fontFamily="Noto Sans Lao" fontWeight="bold">
              CHECKOUT
            </Typography>
          </Button>
        </Box>
      </form>
      <Box>
        <Box display="flex" alignContent="center" gap={2}>
          <MonitorIcon sx={{ fontSize: 35 }} />
          <Typography
            fontFamily="Noto Sans Lao"
            fontSize={25}
            sx={{ alignItems: "center" }}
          >
            ຄົ້ນຫາເມນູ
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", // ✅ allows wrapping
          gap: 0, // space between tabs
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "flex-start",
          }}
        >
          {categories.map((cat, index) => (
            <Box
              key={cat}
              onClick={() => setSelectedTab(index)}
              sx={{
                px: 4,
                py: 4,
                minWidth: 190,
                borderRadius: "8px",
                border: "1px solid lightgray",
                cursor: "pointer",
                fontSize: 25,
                fontWeight: selectedTab === index ? "bold" : "normal",
                color: selectedTab === index ? "green" : "gray",
                backgroundColor: selectedTab === index ? "#eaffea" : "white",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {cat}
            </Box>
          ))}
        </Box>

        {categories.map((category, index) => (
          <TabPanel key={category} value={selectedTab} index={index}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Category: {category}
            </Typography>
            <Grid2 container spacing={3} mt={2}>
              {data[category].map((item, i) => (
                <Grid2 key={`${item.id}-${i}`}>
                  <Card onClick={() => handleClickOpen(item)}>
                    <CardMedia
                      sx={{
                        cursor: "pointer",
                      }}
                      component="img"
                      height="180"
                      image={item.image}
                      alt={item.name}
                    />
                    <CardContent
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      <Typography variant="h6" fontSize={20}>
                        {item.menuName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Size: {item.size}
                      </Typography>
                      <Typography variant="body1" fontSize={18} color="green">
                        {item.price?.toLocaleString("id-ID")} KIP
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </TabPanel>
        ))}
      </Box>
      <Box>
        <Box
          sx={{
            padding: 8,
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
                  src={userInfo?.image}
                  alt={userInfo?.username}
                  style={{ width: 120, height: 120 }}
                />
                <Typography
                  fontFamily="Noto Sans Lao"
                  fontSize={15}
                  sx={{ alignSelf: "center", marginLeft: 2 }}
                >
                  {userInfo?.username}
                </Typography>
              </Box>
              <Typography variant="h5">CUSTOMER ID: {userInfo?.id}</Typography>
              <Typography variant="h5">
                BILL NO: #{userInfo?.bill[0]?.id} | TIME{" "}
                {userInfo?.bill[0]?.billDate}
              </Typography>
            </Box>
            {userBill.length > 0 && (
              <Box>
                <Card
                  sx={{ width: 200, justifySelf: "end", marginBottom: "10" }}
                >
                  <CardMedia
                    sx={{
                      cursor: "pointer",
                    }}
                    component="img"
                    height="200px"
                    image={userBill[0]?.img}
                    alt={"hot americano"}
                  />
                </Card>
                <Typography variant="h4" fontSize={34} fontWeight={"bold"}>
                  {userBill[0]?.menu} {`[${userBill[0]?.size}]`}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 30,
                    fontWeight: "bold",
                    justifySelf: "end",
                  }}
                >
                  {userBill[0]?.price.toLocaleString() || 0} KIP X{" "}
                  {userBill[0]?.qty} UNIT
                </Typography>
                <Typography
                  sx={{
                    fontSize: 35,
                    fontWeight: "bold",
                    justifySelf: "end",
                    color: "rgb(236, 70, 70)",
                  }}
                >
                  {(userBill[0]?.price * userBill[0]?.qty).toLocaleString() ||
                    0}{" "}
                  KIP
                </Typography>
              </Box>
            )}
          </Box>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteSelected}
            >
              DELETE
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleDeleteAll}
              disabled={userBill?.length === 0}
            >
              DELETE ALL
            </Button>
          </Box>
          <Box>
            <Paper sx={{ marginTop: 4, height: 200, overflow: "auto" }}>
              <Table>
                <TableHead sx={{ backgroundColor: "rgba(0, 0, 0, 0.29)" }}>
                  <TableRow>
                    <TableCell>SELECT</TableCell>
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
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
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
                        <TableCell>{row.price?.toLocaleString()}</TableCell>
                        <TableCell>{row.qty}</TableCell>
                        <TableCell>
                          {(row?.price * row?.qty).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Box>
          <Box display="flex" justifyContent="end" gap={3}>
            <Typography variant="h3" fontWeight="bold" alignSelf="center">
              TOTAL
            </Typography>
            <Typography
              variant="h2"
              sx={{ alignSelf: "center", color: "red", fontWeight: "bold" }}
            >
              {totalSum?.toLocaleString()} KIP
            </Typography>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmitDialog,
            sx: {
              width: "900px", // or '80vw'
              height: "70vh", // or any other size like '700px'
              maxWidth: "none", // important to disable default maxWidth
            },
          },
        }}
      >
        <DialogTitle>
          <Typography
            fontFamily={"Noto Serif Lao"}
            justifySelf={"center"}
            fontSize={25}
          >
            ເລືອກເມນູເຂົ້າບິນລູກຄ້າ ID: {userInfo?.id}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ display: "flex" }}>
          <CardContent>
            <CardMedia
              sx={{
                cursor: "pointer",
              }}
              component="img"
              height="400"
              image={selectedItem?.image}
              alt={selectedItem?.name}
            />
          </CardContent>
          <Box>
            {/**TEXT HEADER SECTION */}

            <Box
              display="flex"
              flexDirection="column"
              borderBottom={"1px white solid"}
            >
              <Typography
                fontFamily={"Noto Serif Lao"}
                fontSize={25}
                alignSelf={"center"}
              >
                ໃສ່ຊື່ເມນູພາສາລາວ
              </Typography>
              <Typography fontSize={25} alignSelf={"center"}>
                {selectedItem?.menuName}
              </Typography>
              <Typography
                sx={{ color: "rgb(228, 61, 61)" }}
                fontSize={35}
                alignSelf={"center"}
                fontWeight={"bold"}
                fontFamily={"Noto Serif Lao"}
              >
                {(selectedItem?.price || 0).toLocaleString() + "ກີບ"}
              </Typography>
            </Box>

            {/** INPUT CUP NUMBER SECTION */}

            <Box
              display="flex"
              padding={"8px"}
              gap={2}
              justifyContent={"center"}
            >
              <Typography
                fontFamily={"Noto Serif Lao"}
                fontSize={25}
                alignSelf={"center"}
              >
                ຈຳນວນ
              </Typography>
              <input
                style={{
                  fontSize: 40,
                  width: "40%",
                  height: 60,
                  fontFamily: "Noto Serif Lao",
                }}
                type="number"
                min="1" // ✅ Prevent using arrows or typing numbers less than 1
                value={quantity === null ? "" : quantity}
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow empty string in input
                  if (value === "") {
                    setQuantity(null);
                  } else {
                    setQuantity(Number(value));
                  }
                }}
                onBlur={() => {
                  // On blur, reset to 1 if left empty
                  if (quantity === null || quantity === 0) {
                    setQuantity(1);
                  }
                }}
                onWheel={(e) => e.target.blur()}
              />
            </Box>

            {/**SWEET SELECT DETAIL SETION */}

            <Box
              display={"flex"}
              flexDirection={"column"}
              sx={{ borderBottom: "1px solid white", padding: "6px 0 10px 0" }}
            >
              <Typography
                fontFamily={"Noto Serif Lao"}
                alignSelf={"center"}
                fontSize={25}
              >
                ເພີ່ມເຕີມ
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="Sweet-Detail-label"
                  id="Sweet-select"
                  sx={{
                    color: "white",
                    fontFamily: "Noto Serif Lao",
                    width: "50%",
                    alignSelf: "center",
                    fontSize: 25,
                  }}
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                >
                  <MenuItem
                    selected
                    value={"ທຳມະດາ"}
                    style={{ fontFamily: "Noto Serif Lao", fontSize: 25 }}
                  >
                    ທຳມະດາ
                  </MenuItem>
                  <MenuItem
                    value={"ຫວານຫຼາຍ"}
                    style={{ fontFamily: "Noto Serif Lao", fontSize: 25 }}
                  >
                    ຫວານຫຼາຍ
                  </MenuItem>
                  <MenuItem
                    value={"ຫວານໜ້ອຍ"}
                    style={{ fontFamily: "Noto Serif Lao", fontSize: 25 }}
                  >
                    ຫວານໜ້ອຍ
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/** TOTAL PRICE SECTION */}

            <Box
              display={"flex"}
              gap={2}
              justifyContent={"center"}
              marginTop={2}
            >
              <Typography fontFamily={"Noto Serif Lao"} fontSize={35}>
                ລວມທັງໝົດ:{" "}
              </Typography>
              <Typography
                fontFamily={"Noto Serif Lao"}
                fontSize={35}
                color="rgb(252, 62, 62)"
              >
                {(selectedItem?.price * quantity).toLocaleString() + " KIP"}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", gap: 2 }}>
          <Button
            type="submit"
            color="success"
            variant="contained"
            sx={{
              color: "rgb(0, 0, 0)",
              fontFamily: "Noto Serif Lao",
              fontSize: 35,
            }}
          >
            ສົ່ງຟອມ
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            sx={{
              color: "rgb(0, 0, 0)",
              fontFamily: "Noto Serif Lao",
              fontSize: 35,
            }}
          >
            ຍົກເລີກ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductDetail;

// Custom TabPanel Component (like MUI docs)
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

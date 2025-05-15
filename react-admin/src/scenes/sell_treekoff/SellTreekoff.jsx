import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Link,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MonitorIcon from "@mui/icons-material/Monitor";
import { Outlet, Link as RouterLink } from "react-router-dom";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { useLocation } from "react-router-dom";

const SellTreekoff = () => {
  const [selectOnline, setSelectOnline] = useState(false);
  const location = useLocation();
  return (
    <Box
      sx={{
        width: "98.5%",
        bgcolor: "#e4e4e4",
        margin: "15px",
        overflow: "hidden",
        p: "18px",
      }}
    >
      <Box display="flex" width="100%" height="100%" gap="30px">
        <Box display="flex" flexDirection="column" width="32%" gap="15px">
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              height: "350px",
              bgcolor: "blue",
              borderRadius: "5px",
            }}
          >
            <Card
              sx={{
                bgcolor: "#ffffff",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardMedia
                sx={{
                  height: "115px",
                  width: "115px",
                  borderRadius: "50%",
                  marginTop: 2,
                }}
                image="/assests/user.png"
                title="profile picture"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "90%",
                  borderBottom: "1px solid black",
                }}
              >
                <Typography
                  variant="laoText"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  ທ້າວ ອາດອຟ ນິກເລີ
                </Typography>
                <Typography
                  variant="laoText"
                  sx={{
                    color: "black",
                    fontSize: 12,
                  }}
                >
                  ຫົວໜ້າສູນຝືກອົບຮົມ
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  width: "90%",
                  paddingLeft: "0",
                  paddingRight: "0",
                }}
              >
                <Typography variant="laoText" color="black" fontWeight="bold">
                  ປະຈຳສາຂາ
                </Typography>
                <Typography variant="laoText" color="black" display="flex">
                  <LocationCityIcon />
                  ສຳນັກງານໃຫ່ຍ
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                  width: "90%",
                  borderBottom: "1px solid black",
                  paddingLeft: "0",
                  paddingRight: "0",
                }}
              >
                <Typography variant="laoText" color="black" fontWeight="bold">
                  ແຕ້ມສະສົມພະນັກງານ
                </Typography>
                <Typography variant="laoText" color="black" display="flex">
                  1
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              bgcolor: "green",
              height: "350px",
              borderRadius: "5px",
            }}
          >
            <Card
              sx={{
                bgcolor: "#ffffff",
                height: "100%",
                width: "100%",
                color: "black",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid black",
                  width: "90%",
                }}
              >
                <MonitorIcon
                  sx={{
                    alignSelf: "center",
                    marginRight: 1,
                  }}
                />
                <Typography variant="laoText" sx={{ fontSize: 20 }}>
                  ເລືອກໜ້າຕ່າງການຂາຍ
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid black",
                  width: "90%",
                }}
              >
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 20,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    sx={{ height: 50, width: 74 }}
                    image="/assests/TK.png"
                    title="TREEKOFF"
                  />
                  <Typography
                    variant="h5"
                    color="black"
                    fontWeight="bold"
                    sx={{
                      display: "flex",
                      color: "blue",
                    }}
                  >
                    {" "}
                    CUSTOMER SCREEN
                  </Typography>
                </Button>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid black",
                  width: "90%",
                }}
              >
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 20,
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => setSelectOnline(false)}
                >
                  <CardMedia
                    sx={{ height: 50, width: 74 }}
                    image="/assests/TK.png"
                    title="TREEKOFF"
                  />
                  <Typography
                    variant="h5"
                    color="black"
                    fontWeight="bold"
                    sx={{
                      display: "flex",
                      color: "blue",
                    }}
                  >
                    {" "}
                    TREEKOFF
                  </Typography>
                </Button>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid black",
                  width: "90%",
                }}
              >
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 20,
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => setSelectOnline(true)}
                >
                  <CardMedia
                    sx={{ height: 50, width: 74 }}
                    image="/assests/TK.png"
                    title="TREEKOFF"
                  />
                  <Typography
                    variant="h5"
                    color="black"
                    fontWeight="bold"
                    sx={{
                      display: "flex",
                      color: "blue",
                    }}
                  >
                    <PhoneAndroidIcon /> TREEKOFF(ONLINE)
                  </Typography>
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "yellow",
          }}
        >
          {selectOnline ? (
            <Card
              sx={{
                bgcolor: "#ffffff",
                height: "100%",
                width: "100%",
                color: "black",
              }}
            >
              This is for onlie
            </Card>
          ) : (
            <Card
              sx={{
                bgcolor: "#ffffff",
                height: "100%",
                width: "100%",
                color: "black",
              }}
            >
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{
                  color: "black",
                  height: "60px",
                  borderBottom: "1px solid black",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                }}
              >
                <Link
                  component={RouterLink}
                  to="/selltreekoff/customer"
                  color="inherit"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor:
                      location.pathname === "/selltreekoff/customer"
                        ? "green"
                        : "transparent",
                    padding: 1,
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}
                >
                  <PersonIcon />
                  <Typography variant="laoText">
                    ເຂົ້າຊູ່ສະມາຊິກລູກຄ້າ
                  </Typography>
                </Link>
                <Link
                  component={RouterLink}
                  to="/selltreekoff/productdetail"
                  color="inherit"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor:
                      location.pathname === "/selltreekoff/productdetail"
                        ? "green"
                        : "transparent",
                    padding: 1,
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}
                >
                  <LocalAtmIcon />
                  <Typography variant="laoText">ລາຍການບິນສິນຄ້າ</Typography>
                </Link>
                <Link
                  component={RouterLink}
                  to="/selltreekoff/checkbill"
                  color="inherit"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor:
                      location.pathname === "/selltreekoff/checkbill"
                        ? "green"
                        : "transparent",
                    padding: 1,
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}
                >
                  <FormatListBulletedIcon />
                  <Typography variant="laoText">ຈ່າຍເງີນ</Typography>
                </Link>
              </Breadcrumbs>
              <CardContent>
                <Outlet />
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SellTreekoff;

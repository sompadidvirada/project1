import { Box, Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import {
  Outlet,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import { NavLink } from "react-router-dom";

const MenuDetailAndBread = ({ selectOnline }) => {
  const location = useLocation();
  return (
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
            <NavLink
              to="/selltreekoff"
              end
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: isActive ? "green" : "transparent",
                padding: 8,
                borderRadius: 5,
                color: "inherit",
                textDecoration: "none",
              })}
            >
              <PersonIcon />
              <Typography variant="laoText">ເຂົ້າຊູ່ສະມາຊິກລູກຄ້າ</Typography>
            </NavLink>
            <NavLink
              to="/selltreekoff/productdetail"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: isActive ? "green" : "transparent",
                padding: 8,
                borderRadius: 5,
                color: "inherit",
                textDecoration: "none",
              })}
            >
              <LocalAtmIcon />
              <Typography variant="laoText">ລາຍການບິນສິນຄ້າ</Typography>
            </NavLink>
            <NavLink
              to="/selltreekoff/checkbill"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: isActive ? "green" : "transparent",
                padding: 8,
                borderRadius: 5,
                color: "inherit",
                textDecoration: "none",
              })}
            >
              <FormatListBulletedIcon />
              <Typography variant="laoText">ຈ່າຍເງີນ</Typography>
            </NavLink>
          </Breadcrumbs>
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default MenuDetailAndBread;

import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import useBakeryStore from "../../zustand/storage";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const logOut = useBakeryStore((state) => state.logout);

  const handleLogout = () => {
    
    setTimeout(() => {
      logOut(); // Clear user state
    }, 1000); // 1-second delay
    navigate("/login", { replace: true }); // Redirect after logout
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box></Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LoginIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
export default Topbar;

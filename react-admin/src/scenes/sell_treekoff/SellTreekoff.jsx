import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import CustomerDisplay from "./component/CustomerDisplay";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import EmployeeDetail from "./component/EmployeeDetail";
import OnlineCustomer from "./component/OnlineCustomer";
import MenuDetailAndBread from "./component/MenuDetailAndBread";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const SellTreekoff = () => {
  const theme = createTheme();
  const [selectOnline, setSelectOnline] = useState(false);
  const popupRef = useRef(null);
  const customerRootRef = useRef(null);

  const openWindow = () => {
    const customerWindow = window.open(
      "",
      "Customer Screen",
      "width=800,height=800,left=1000,top=100"
    );

    if (customerWindow) {
      popupRef.current = customerWindow;
      customerWindow.document.title = "Customer Display";

      // Inject custom styles if needed
      const style = customerWindow.document.createElement("style");
      style.textContent = `
      body {
        margin: 0;
        padding: 0;
        background-color: #222d32;
        font-family: 'Noto Sans Lao', sans-serif;
      }
    `;
      customerWindow.document.head.appendChild(style);

      // Create a container div for React rendering
      const container = customerWindow.document.createElement("div");
      customerWindow.document.body.appendChild(container);

      // 💡 Create Emotion cache for the new window
      const emotionCache = createCache({
        key: "mui-popup",
        container: customerWindow.document.head,
      });

      customerRootRef.current = ReactDOM.createRoot(container);
      customerRootRef.current.render(
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <CustomerDisplay />
          </ThemeProvider>
        </CacheProvider>
      );
    }

    return () => {
      popupRef.current?.close();
    };
  };

  useEffect(() => {
    openWindow();
  }, []);

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
          <EmployeeDetail />
          <OnlineCustomer
            setSelectOnline={setSelectOnline}
            openWindow={openWindow}
          />
        </Box>
        <MenuDetailAndBread selectOnline={selectOnline} />
      </Box>
    </Box>
  );
};

export default SellTreekoff;

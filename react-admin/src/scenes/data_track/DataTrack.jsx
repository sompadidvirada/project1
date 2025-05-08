import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../../component/Header";
import Calendar from "../bar/Calendar";
import { tokens } from "../../theme";
import SnackbarNotification from "../../component/SneakerBar";
import { DataGrid } from "@mui/x-data-grid";
import useBakeryStore from "../../zustand/storage";
import CloseIcon from "@mui/icons-material/Close";

const DataTrack = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" or "error"
  const products = useBakeryStore((state) => state.products);
  const dataTrack = useBakeryStore((state) => state.dataTrack);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "image",
      headerName: "PICTURE",
      flex: 0.2,
      renderCell: (params) => {
        const imageUrl = params.row.image
          ? `http://localhost:5003/uploads/${params.row.image}`
          : null;
        return imageUrl ? (
          <img
            src={imageUrl}
            alt="Product"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleImageClick(imageUrl)}
          />
        ) : (
          <span>No Image</span>
        );
      },
    },
    {
      field: "name",
      headerName: "NAME",
      type: "text",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
      flex: 0.5,
      renderCell: (params) => (
        <Typography
          variant="laoText"
          fontWeight="bold"
          color={colors.grey[100]}
        >
          {params?.value}
        </Typography>
      ),
    },
    {
      field: "totalSend",
      type: "number",
      headerName: "SEND",
      flex: 0.5,
    },
    {
      field: "totalSell",
      type: "number",
      headerName: "SELL",
      flex: 0.5,
    },
    {
      field: "totalExp",
      type: "number",
      headerName: "EXP",
      flex: 0.5,
    },
    {
      field: "percent",
      type: "number",
      headerName: "%",
      flex: 0.5,
      renderCell: (params) => {
        const value = params.value;
        let color = colors.greenAccent[400];
        if (value > 30) {
          color = "#f44336"; // red
        } else if (value > 15) {
          color = "#ffeb3b"; // yellow
        }
    
        return (
          <Typography fontWeight="bold" color={color}>
            {value} %
          </Typography>
        );
      },
    },
  ];

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImageUrl(null);
  };
  return (
    <Box m="20px" textAlign="center">
      <Header title="TRACKING EVERY BRACH SALE AND EXPIRE" />
      <Box
        mt="30px"
        display="grid"
        gridTemplateColumns="repeat(1, 20fr)"
        gridAutoRows="60px"
        gap="20px"
      >
        {/** Section 1  select calendar and select branches. */}

        <Box
          gridColumn="span 1"
          backgroundColor={colors.primary[400]}
          sx={{
            width: "100%",
            height: "100%",
            textDecoration: "none",
            alignContent: "center",
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="20px"
          >
            <Box>
              <Calendar />
            </Box>
          </Box>
        </Box>

        {/**Section 2 insert data */}

        <Box
          gridColumn="span 1"
          gridRow="span 9"
          backgroundColor={colors.primary[400]}
          sx={{
            width: "100%",
            height: "100%",
            textDecoration: "none",
          }}
        >
          <Box
            m="40px 0 0 0"
            width="98%"
            height="100%"
            overflow="scroll"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            {dataTrack.map((brach, index) => {
              const rowsWithPercent = brach.detail.map((item) => ({
                ...item,
                percent:
                  item.totalSend > 0
                    ? parseFloat(
                        ((item.totalExp / item.totalSend) * 100).toFixed(2)
                      )
                    : 0,
              }));

              return (
                <Box key={brach.id} sx={{
                  mb:"30px"
                }}>
                  <Header
                    title={
                      <Typography variant="laoText" sx={{ fontSize: 30 }}>
                        {brach.name}
                      </Typography>
                    }
                  />
                  <DataGrid rows={rowsWithPercent} columns={columns} />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      {/** image modal */}
      <Dialog
        open={openImageModal}
        onClose={handleCloseImageModal}
        maxWidth="md"
      >
        <DialogContent sx={{ position: "relative", padding: "0" }}>
          <IconButton
            onClick={handleCloseImageModal}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "white",
              "&:hover": { backgroundColor: "gray" },
            }}
          >
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>
          {selectedImageUrl && (
            <img
              src={selectedImageUrl}
              alt="Large Preview"
              style={{
                width: "100%",
                height: "800px",
                maxHeight: "90vh",
                overflow: "hidden",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      {/* Snackbar for success message */}
      <SnackbarNotification
        open={openSnackbar}
        message={snackbarMessage}
        severity={severity}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default DataTrack;

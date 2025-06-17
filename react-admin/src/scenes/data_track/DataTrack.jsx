import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect, useMemo, Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";
import Header from "../../component/Header";
import Calendar from "../bar/Calendar";
import { tokens } from "../../theme";
import useBakeryStore from "../../zustand/storage";
import CloseIcon from "@mui/icons-material/Close";

// Lazy-load the BranchDataGrid component
const LazyBranchDataGrid = lazy(() => import("./component/BranchDataGrid"));

const DataTrack = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dataTrack = useBakeryStore((state) => state.dataTrack);
  const filteredBranches = dataTrack.map((branch) => {
    return {
      ...branch,
      detail: branch.detail.filter(
        (product) => product.availableProductCount !== 0
      ),
    };
  });

  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [filterData, setFilterData] = useState(true);

  // Preload unique images once
  useEffect(() => {
    if (!dataTrack || dataTrack.length === 0) return; // Prevent processing if dataTrack is empty or undefined

    const imageUrls = dataTrack
      .flatMap((branch) => branch.detail || []) // Fallback to empty array if `detail` is undefined
      .map((item) =>
        item.image
          ? `${process.env.REACT_APP_API_URL}/uploads/${item.image}`
          : null
      )
      .filter(Boolean);

    const uniqueUrls = [...new Set(imageUrls)];

    uniqueUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, [dataTrack]);

  // Preprocess data using useMemo
  const processedData = useMemo(() => {
    const FinalData = filterData ? filteredBranches : dataTrack;
    return FinalData.map((branch) => {
      const rowsWithPercent = branch.detail.map((item) => ({
        ...item,
        percent:
          item.totalSend > 0
            ? parseFloat(((item.totalExp / item.totalSend) * 100).toFixed(2))
            : 0,
      }));

      const totalExp = branch.detail.reduce(
        (sum, item) => sum + item.totalPriceExp,
        0
      );
      const totalSend = branch.detail.reduce(
        (sum, item) => sum + item.totalPriceSend,
        0
      );
      const totalSell = branch.detail.reduce(
        (sum, item) => sum + item.totalPriceSell,
        0
      );
      const branchPercent =
        totalSend > 0 ? ((totalExp / totalSend) * 100).toFixed(2) : "0.00";

      return {
        ...branch,
        rowsWithPercent,
        totalExp,
        totalSend,
        totalSell,
        branchPercent,
      };
    });
  }, [dataTrack, filterData]);


  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 0.2 },
      {
        field: "image",
        headerName: "PICTURE",
        flex: 0.2,
        renderCell: (params) => {
          const imageUrl = params.row.image
            ? `${process.env.REACT_APP_API_URL}/uploads/${params.row.image}`
            : null;
          return imageUrl ? (
            <img
              src={imageUrl}
              alt="Product"
              loading="lazy"
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
      { field: "totalSend", headerName: "SEND", type: "number", flex: 0.5 },
      { field: "totalSell", headerName: "SELL", type: "number", flex: 0.5 },
      { field: "totalExp", headerName: "EXP", type: "number", flex: 0.5 },
      { field: "price", headerName: "PRICE", type: "number", flex: 0.5 },
      {
        field: "sellPrice",
        headerName: "SELL PRICE",
        type: "number",
        flex: 0.5,
      },
      {
        field: "totalPriceSend",
        headerName: "TOTAL SEND",
        headerAlign: "center",
        type: "number",
        flex: 0.5,
        renderCell: (params) => {
          let color = colors.blueAccent[400];
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography color={color}>
                {params?.value.toLocaleString()}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "totalPriceSell",
        headerName: "TOTAL SELL",
        headerAlign: "center",
        type: "number",
        flex: 0.5,
        renderCell: (params) => {
          let color = colors.greenAccent[400];
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography color={color}>
                {params?.value.toLocaleString()}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "totalPriceExp",
        headerName: "TOTAL EXP",
        headerAlign: "center",
        type: "number",
        flex: 0.5,
        renderCell: (params) => {
          let color = colors.redAccent[400];
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Typography color={color}>
                {params?.value.toLocaleString()}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: "percent",
        headerName: "%",
        type: "number",
        flex: 0.5,
        renderCell: (params) => {
          const value = params.value;
          let color = colors.greenAccent[400];
          if (value > 30) color = "#f44336";
          else if (value > 15) color = "#ffeb3b";

          return (
            <Typography fontWeight="bold" color={color}>
              {value} %
            </Typography>
          );
        },
      },
    ],
    [colors]
  );

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImageUrl(null);
  };

  const handleFilter = () => {
    setFilterData((prev) => !prev);
  };

  return (
    <Box m="20px" textAlign="center">
      <Header title="TRACKING EVERY BRANCH SALE AND EXPIRE" />
      <Box
        mt="30px"
        display="grid"
        gridTemplateColumns="repeat(1, 20fr)"
        gridAutoRows="60px"
        gap="20px"
      >
        <Box gridColumn="span 1" backgroundColor={colors.primary[400]}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="20px"
          >
            <Calendar />
            <Button variant="contained" onClick={handleFilter}>
              FILTER DATA
            </Button>
          </Box>
        </Box>

        <Box
          gridColumn="span 1"
          gridRow="span 9"
          backgroundColor={colors.primary[400]}
        >
          <Box
            m="40px 0 0 0"
            width="98%"
            height="100%"
            overflow="scroll"
            sx={{
              "& .MuiDataGrid-root": { border: "none" },
              "& .MuiDataGrid-cell": { borderBottom: "none" },
              "& .name-column--cell": { color: colors.greenAccent[300] },
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
            <Suspense
              fallback={
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  py={5}
                >
                  <CircularProgress style={{ color: "white" }} />
                </Box>
              }
            >
              {processedData.map((branch) => (
                <LazyBranchDataGrid
                  key={`${branch.id}-${filterData}`} // 👈 key changes when filterData changes
                  branch={branch}
                  columns={columns}
                />
              ))}
            </Suspense>
          </Box>
        </Box>
      </Box>

      {/* Image Modal */}
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
    </Box>
  );
};

export default DataTrack;

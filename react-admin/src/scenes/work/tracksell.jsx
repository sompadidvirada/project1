import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { tokens } from "../../theme";
import Calendar from "./component/Calendar";
import { DataGrid } from "@mui/x-data-grid";
import useBakeryStore from "../../zustand/storage";
import CloseIcon from "@mui/icons-material/Close";
import SelectBrach from "./component/SelectBrarch";
import { checkTrackSell, tracksell } from "../../api/tracking";
import SnackbarNotification from "../../component/SneakerBar";
import DialogSell from "./component/DialogSell";

const Tracksell = () => {
  // Create..........................
  const token = useBakeryStore((state) => state.token);
  const user = useBakeryStore((state) => state.user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const products = useBakeryStore((state) => state.products);
  const getProducts = useBakeryStore((state) => state.getProducts);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" or "error"
  const [selectFormtracksell, setSelectFormtracksell] = useState({
    sellCount: "",
    sellAt: "",
    userId: user.id,
    productId: "",
    brachId: "",
  });
  const [selectDateBrachCheck, setSelectDateBrachCheck] = useState({
    sellDate: "",
    brachId: "",
  });
  const [sellCounts, setSellCounts] = useState({});

  useEffect(() => {
    getProducts();
  }, [token]);

  const [checked, setChecked] = useState(null);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "image",
      headerName: "PICTURE",
      flex: 0.5,
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
      flex: 1,
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
      field: "category",
      headerName: "CATEGORY",
      type: "text",
      headerAlign: "left",
      flex: 0.5,
      align: "left",
      renderCell: (params) => {
        return params.row.category ? (
          <Typography
            variant="laoText"
            fontWeight="bold"
            color={colors.grey[100]}
          >
            {params.row.category.name}
          </Typography>
        ) : (
          "No Category"
        );
      },
    },
    {
      field: "price",
      type: "number",
      headerName: "PRICE",
      flex: 0.5,
    },
    {
      field: "sellprice",
      type: "number",
      headerName: "SELL PRICE",
      flex: 0.5,
    },
    {
      field: "manage",
      headerName: "SALE COUNT",
      flex: 0.5,
      renderCell: (params) => {
        const productId = params.row.id;

        // Find the tracked product in `checked`
        const trackedProduct = checked?.find(
          (item) => item.productId === productId
        );

        if (trackedProduct) {
          return (
            <Box display="flex-row">
              <span
                style={{ color: colors.greenAccent[200], fontWeight: "bold" }}
              >
                Tracked. ({trackedProduct.sellCount})
              </span>
              <DialogSell
                productId={productId}
                trackedProduct={trackedProduct}
                selectFormtracksell={selectFormtracksell}
                setSelectFormtracksell={setSelectFormtracksell}
                fetchDateBrachCheck={fetchDateBrachCheck}
              />
            </Box>
          );
        }

        return (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <input
              type="number"
              min="0"
              value={sellCounts[productId] || ""}
              onChange={(e) =>
                handleChange(productId, Math.max(0, e.target.value))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSetSellCount(productId);
                if (e.key === "ArrowUp" || e.key === "ArrowDown")
                  e.preventDefault(); // Prevent up/down arrows
              }}
              onWheel={(e) => e.target.blur()} // Prevent scroll
              style={{
                width: "60px",
                padding: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                textAlign: "center",
                appearance: "textfield", // Hides arrows in most browsers
                MozAppearance: "textfield", // Hides arrows in Firefox
                WebkitAppearance: "none", // Hides arrows in WebKit browsers (Chrome, Safari)
              }}
            />
            <button
              onClick={() => handleSetSellCount(productId)}
              style={{
                background: "#4CAF50",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              ✔
            </button>
          </div>
        );
      },
    },
  ];

  // Function.............................

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImageUrl(null);
  };

  // Handle input change for a specific product
  const handleChange = (productId, value) => {
    setSellCounts((prev) => ({ ...prev, [productId]: value }));
  };

  // Handle setting sellCount when user presses Enter or clicks button
  const handleSetSellCount = async (productId) => {
    if (!sellCounts[productId]) return; // Prevent empty values

    if (
      selectFormtracksell.sellAt === "" ||
      selectFormtracksell.brachId === ""
    ) {
      setSeverity("error");
      setSnackbarMessage("Select Date and Branch first.");
      setOpenSnackbar(true);
      return;
    }

    const updatedForm = {
      ...selectFormtracksell,
      productId,
      sellCount: sellCounts[productId],
    };

    setSelectFormtracksell(updatedForm);

    try {
      await tracksell(updatedForm, token);

      // **Update checked state with new entry**
      setChecked((prevChecked) => [
        ...prevChecked,
        { productId, sellCount: sellCounts[productId] },
      ]);

      setSeverity("success");
      setSnackbarMessage("Insert Tracksell Success.");
      setOpenSnackbar(true);

      // Reset input field after submission
      setSellCounts((prev) => ({ ...prev, [productId]: "" }));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDateBrachCheck = async () => {
    // Ensure that both branch ID and sell date are available
    if (selectDateBrachCheck.brachId && selectDateBrachCheck.sellDate) {
      try {
        const res = await checkTrackSell(selectDateBrachCheck, token);
        setChecked(res.data);
      } catch (error) {
        console.error("Error fetching branch check:", error);
      }
    }
  };
  useEffect(() => {
    fetchDateBrachCheck();
  }, [selectDateBrachCheck.brachId, selectDateBrachCheck.sellDate, token]);

  //Return zone...........................

  return (
    <Box m="20px" textAlign="center">
      <Header title="INSERT TRACK SALE" />
      <Box
        mt="30px"
        display="grid"
        gridTemplateColumns="repeat(1, 10fr)"
        gridAutoRows="60px"
        gap="20px"
      >
        {/** Section 1  select calendar and select branches. */}

        <Box
          gridColumn="span 1"
          backgroundColor={colors.primary[400]}
          sx={{
            width: "100%",
            maxWidth: "1600px",
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
              <Calendar
                selectFormtracksell={selectFormtracksell}
                setSelectFormtracksell={setSelectFormtracksell}
                setSelectDateBrachCheck={setSelectDateBrachCheck}
              />
            </Box>
            <Box>
              <SelectBrach
                selectFormtracksell={selectFormtracksell}
                setSelectFormtracksell={setSelectFormtracksell}
                setSelectDateBrachCheck={setSelectDateBrachCheck}
              />
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
            maxWidth: "1600px",
            height: "100%",
            textDecoration: "none",
          }}
        >
          <Box
            m="40px 0 0 0"
            height="70vh"
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
            {selectFormtracksell.sellAt && selectFormtracksell.brachId ? (
              <DataGrid rows={products} columns={columns} />
            ) : (
              <Typography
                variant="laoText"
                fontWeight="bold"
                color={colors.grey[100]}
              >
                "ເລືອກວັນທີ່ ແລະ ສາຂາທີ່ຕ້ອງການເພີ່ມຂໍ້ມູນ"
              </Typography>
            )}
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

export default Tracksell;

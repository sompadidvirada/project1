import React, { useState } from "react";
import { updateStatusProduct } from "../../../api/product";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SelectStatus from "../manageproduct/SelectStatus";
import { DataGrid } from "@mui/x-data-grid";

const DisplayStatusDialog = ({
  setOpenDetailDialog,
  openDetailDialog,
  selectedProduct,
  setSelectedProduct,
}) => {
  const [formUpdateAviable, setFormUpdateAviable] = useState({});

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
    setSelectedProduct(null);
  };

 const hadleUpdateAviable = async (row) => {
  try {
    const updatedStatus = await updateStatusProduct(
      row.productId,
      formUpdateAviable
    );

    // Update local state to reflect the change
    setSelectedProduct((prev) => {
      const updatedAvailableProducts = prev.avilableproduct.map((item) =>
        item.id === updatedStatus?.data?.id
          ? { ...item, aviableStatus: updatedStatus?.data?.aviableStatus, updateAt: updatedStatus?.data?.updateAt }
          : item
      );
      return { ...prev, avilableproduct: updatedAvailableProducts };
    });

    // Clear form
    setFormUpdateAviable({});
  } catch (err) {
    console.log(err);
  }
};

  return (
    <Dialog
      open={openDetailDialog}
      onClose={handleCloseDetailDialog}
      PaperProps={{
        sx: {
          width: "80vw",
          height: "80vh",
          maxWidth: "none", // Prevent default maxWidth constraints
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifySelf={"center"} gap={5}>
          <img
            style={{ width: "60px", borderRadius: "5px" }}
            src={`${process.env.REACT_APP_API_URL}/uploads/${selectedProduct?.image}`}
          />
          <Typography variant="h2">{selectedProduct?.name}</Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleCloseDetailDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[100],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={selectedProduct?.avilableproduct ?? []}
            columns={[
              { field: "id", headerName: "ID", flex: 0.2 },
              {
                field: "brachName",
                headerName: "Branch Name",
                flex: 1,
                renderCell: (params) => (
                  <Typography sx={{ fontFamily: "Noto Sans Lao" }}>
                    {params.value}
                  </Typography>
                ),
              },
              {
                field: "aviableStatus",
                headerName: "Available",
                flex: 0.5,
                renderCell: (params) =>
                  params.value ? (
                    <Typography color="green">Available</Typography>
                  ) : (
                    <Typography color="red">Unavailable</Typography>
                  ),
              },
              {
                field: "updateAt",
                headerName: "Last Updated",
                flex: 1,
                renderCell: (params) => {
                  const date = new Date(params.value);
                  return isNaN(date)
                    ? "Invalid date"
                    : date.toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      });
                },
              },
              {
                field: "manage",
                headerName: "MANAGE",
                flex: 1,
                renderCell: (params) => {
                  return (
                    <Box display={"flex"} justifyContent={"center"} gap={2}>
                      <SelectStatus
                        setFormUpdateAviable={setFormUpdateAviable}
                        row={params.row}
                        formUpdateAviable={formUpdateAviable}
                      />
                      <Button
                        onClick={() => hadleUpdateAviable(params.row)}
                        disabled={
                          !formUpdateAviable ||
                          formUpdateAviable.brachId !== params.row.brachId ||
                          formUpdateAviable.status === undefined
                        }
                        variant="contained"
                      >
                        SUBMIT
                      </Button>
                    </Box>
                  );
                },
              },
            ]}
            getRowId={(row) => row.id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            hideFooter
            disableSelectionOnClick
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDetailDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisplayStatusDialog;

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { updateTrackSell } from "../../../api/tracking";
import SnackbarNotification from "../../../component/SneakerBar";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import useBakeryStore from "../../../zustand/storage";

export default function DialogSell({
  productId,
  trackedProduct,
  selectFormtracksell,
  fetchDateBrachCheck,
}) {
  const [open, setOpen] = React.useState(false);
  const [editCount, setEditCount] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success"); // "success" or "error"
  const token = useBakeryStore((state)=>state.token)
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditCount((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedForm = {
      ...selectFormtracksell,
      productId,
      sellCount: editCount.sellCount,
    };

    try {
      const res = await updateTrackSell(trackedProduct.id, updatedForm, token);
      setSeverity("success")
      setSnackbarMessage("Update Success")
      setOpenSnackbar(true)
    } catch (err) {
      console.log(err);
    }
    setEditCount("");
    fetchDateBrachCheck();
    handleClose();
  };

  return (
      <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{color: colors.blueAccent[200], backgroundColor: colors.blueAccent[700], ml: "10px"}}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: handleSubmit,
          },
        }}
      >
        <DialogTitle>EDIT SELL COUNT</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ແກ້ໄຂຈຳນວນທີ່ໄດ້ຂາຍ " ເບີ່ງໃຫ້ດີກ່ອນກົດ "
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="sellCount"
            name="sellCount"
            label="Sell Count"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ bgcolor: colors.grey[100],}}>Cancel</Button>
          <Button type="submit" sx={{ bgcolor: colors.grey[100],}}>Submit</Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for success message */}
      <SnackbarNotification
        open={openSnackbar}
        message={snackbarMessage}
        severity={severity}
        onClose={() => setOpenSnackbar(false)}
      />
    </React.Fragment>
    
  );
}

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { tokens } from "../../theme";
import useBakeryStore from "../../zustand/storage";
import { deleteBrach, updateBrach } from "../../api/brach";
import SnackbarNotification from "../../component/SneakerBar";

const ListBrach = () => {
  //Create....

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = useBakeryStore((state) => state.token);
  const brach = useBakeryStore((state) => state.brach) || [];
  const getBrach = useBakeryStore((state) => state.getBrach);
  const [editStates, setEditStates] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" or "error"

  //Function.....
  useEffect(() => {
    getBrach();
  }, [token]);

  const handleOnClickEdit = (id, currentName) => {
    setEditStates((prev) => ({
      ...prev,
      [id]: { isEditing: true, value: currentName }, // Store both edit mode and value
    }));
  };

  const handleSave = async (id) => {
    const updatedValue = editStates[id]?.value;

    // Simulate API update request here (e.g., call an API function)
    try {
      const updateCate = await updateBrach(updatedValue, id, token);
      setSeverity("success");
      setSnackbarMessage(updateCate.data);
      setOpenSnackbar(true);
      getBrach();
    } catch (err) {
      console.log(err);
    }

    // updateCategory(id, updatedValue);

    setEditStates({});
  };

  const handleInputChange = (id, newValue) => {
    setEditStates((prev) => ({
      ...prev,
      [id]: { ...prev[id], value: newValue }, // Update only the value for this category
    }));
  };

  const handleDelete = async (id) => {
    try {
      const deleteCate = await deleteBrach(id, token);
      setSeverity("error");
      setSnackbarMessage(deleteCate.data);
      setOpenSnackbar(true);
      getBrach();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      m="20px"
      display="flex-col"
      sx={{ textAlign: "center" }}
      overflow="auto"
    >
      <Header title="Branch List" />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="430px"
        overflow="auto"
        color={colors.grey[100]}
        p="15px"
      >
        {brach?.map((bch, i) => (
          <Box
            key={`${bch.id}-${i}`}
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography color={colors.grey[100]}>{bch.id}</Typography>
            </Box>
            {/* Check if this row is in edit mode */}
            {editStates[bch.id] ? (
              <TextField
                value={editStates[bch.id]?.value}
                onChange={(e) => handleInputChange(bch.id, e.target.value)}
                variant="outlined"
                size="small"
                sx={{
                  color: colors.grey[100],
                  background: colors.primary[900],
                }}
              />
            ) : (
              <Box color={colors.grey[100]}>
                <Typography
                  variant="laoText"
                  fontWeight="bold"
                  color={colors.grey[100]}
                >
                  {bch.name}
                </Typography>
              </Box>
            )}

            <Box>
              {editStates[bch.id]?.isEditing ? (
                <Button
                  onClick={() => handleSave(bch.id)}
                  sx={{
                    background: colors.greenAccent[500],
                    m: "0 2px 2px 0",
                    "&:hover": { backgroundColor: colors.greenAccent[700] },
                  }}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => handleOnClickEdit(bch.id, bch.name)}
                  sx={{
                    background: colors.greenAccent[500],
                    m: "0 2px 2px 0",
                    "&:hover": { backgroundColor: colors.greenAccent[700] },
                  }}
                >
                  Edit
                </Button>
              )}

              <Button
                onClick={() => handleDelete(bch.id)}
                sx={{
                  background: colors.redAccent[500],
                  m: "0 2px 2px 0",
                  "&:hover": { backgroundColor: colors.redAccent[700] },
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
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

export default ListBrach;

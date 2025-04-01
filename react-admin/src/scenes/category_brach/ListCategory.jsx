import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import useBakeryStore from "../../zustand/storage";
import { deleteCategory, updateCategory } from "../../api/category";
import SnackbarNotification from "../../component/SneakerBar";

const ListCategory = () => {
  //create

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = useBakeryStore((state) => state.token);
  const categorys = useBakeryStore((state) => state.categorys) || [];
  const getCategory = useBakeryStore((state) => state.getCategory);
  const [editStates, setEditStates] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" or "error"

  //function

  useEffect(() => {
    getCategory();
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
      const updateCate = await updateCategory(updatedValue, id, token);
      setSeverity("success");
      setSnackbarMessage(updateCate.data);
      setOpenSnackbar(true);
      getCategory();
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
      const deleteCate = await deleteCategory(id, token);
      setSeverity("error");
      setSnackbarMessage(deleteCate.data);
      setOpenSnackbar(true);
      getCategory();
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
      <Header title="Category List" />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        height="430px"
        overflow="auto"
        color={colors.grey[100]}
        p="15px"
      >
        {categorys?.map((cate, i) => (
          <Box
            key={`${cate.id}-${i}`}
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="15px"
          >
            <Box>
              <Typography color={colors.grey[100]}>{cate.id}</Typography>
            </Box>
            {/* Check if this row is in edit mode */}
            {editStates[cate.id] ? (
              <TextField
                value={editStates[cate.id]?.value}
                onChange={(e) => handleInputChange(cate.id, e.target.value)}
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
                  {cate.name}
                </Typography>
              </Box>
            )}

            <Box>
              {editStates[cate.id]?.isEditing ? (
                <Button
                  onClick={() => handleSave(cate.id)}
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
                  onClick={() => handleOnClickEdit(cate.id, cate.name)}
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
                onClick={() => handleDelete(cate.id)}
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

export default ListCategory;

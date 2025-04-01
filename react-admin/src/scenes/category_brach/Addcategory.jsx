import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Header from "../../component/Header";
import { createCategory } from "../../api/category";
import useBakeryStore from "../../zustand/storage";
import SnackbarNotification from "../../component/SneakerBar";

const Addcategory = () => {
  // create

  const token = useBakeryStore((state) => state.token);
  const getCategory = useBakeryStore((state) => state.getCategory);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" or "error"
  // function

  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      const createCate = await createCategory(values, token);
      setSnackbarMessage(createCate.data);
      setOpenSnackbar(true);
      resetForm();
      getCategory();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box m="20px">
      <Header title="CREATE Category" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialCategoryValues}
        validationSchema={categorySchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ minHeight: "80px" }}>
              {/* Ensures space for error messages */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Category Name.."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.categoryName}
                name="categoryName"
                error={!!touched.categoryName && !!errors.categoryName}
                helperText={touched.categoryName && errors.categoryName}
              />
            </Box>

            {/* Button stays in place */}
            <Box
              display="flex"
              justifyContent="center"
              mt="-23px"
              position="relative"
            >
              <Button type="submit" color="secondary" variant="contained">
                Add Category
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {/* Snackbar for success message */}
      <SnackbarNotification
        open={openSnackbar}
        message={snackbarMessage}
        severity={severity}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  )};
const categorySchema = yup.object().shape({
  categoryName: yup.string().required("required"),
});

const initialCategoryValues = {
  categoryName: "",
};

export default Addcategory;

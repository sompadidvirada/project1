import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Header from "../../component/Header";
import useBakeryStore from "../../zustand/storage";
import { createBrach } from "../../api/brach";
import SnackbarNotification from "../../component/SneakerBar";

const AddBrach = () => {
  //Create
  const brachs = useBakeryStore((state) => state.brach);
  const getBrach = useBakeryStore((state) => state.getBrach);
  const token = useBakeryStore((state) => state.token);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" or "error"

  //Function

  const handleFormSubmit = async (values, { resetForm }) => {
      console.log(values);
      try {
        const createCate = await createBrach(values, token);
        setSnackbarMessage(createCate.data);
        setOpenSnackbar(true);
        getBrach()
        resetForm(); 
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <Box m="20px">
      <Header title="CREATE Brach" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
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
                label="Brach Name.."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.brachName}
                name="brachName"
                error={!!touched.brachName && !!errors.brachName}
                helperText={touched.brachName && errors.brachName}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              mt="-23px"
              position="relative"
            >
              <Button type="submit" color="secondary" variant="contained">
                Add Brach
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
  );
};
const checkoutSchema = yup.object().shape({
  brachName: yup.string().required("required"),
});

const initialValues = {
  brachName: "",
};

export default AddBrach;

import { Box, Button, TextField, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Header";
import { createUser } from "../../api/form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRef } from "react";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const [openSnackbarerror, setOpenSnackbarerror] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const formData = new FormData();

      // Append all other form fields
      Object.keys(values).forEach((key) => {
        if (key === "profileImage") {
          if (values.profileImage) {
            formData.append("profileImage", values.profileImage);
          }
        } else {
          formData.append(key, values[key]);
        }
      });

      const res = await createUser(formData);
      setSnackbarMessage(res.data.message || "Create successful!")
      console.log(res);

      // Reset form after submission
      resetForm(); // Reset Formik values
      setPreviewImage(null); // Clear image preview
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
      if (res.data) {
        setOpenSnackbar(true);
      }
    } catch (err) {
      console.log(err);
      setSnackbarMessage(err.response?.data?.message || "Can't Create User!!");
      setOpenSnackbarerror(true);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phonenumber}
                name="phonenumber"
                error={!!touched.phonenumber && !!errors.phonenumber}
                helperText={touched.phonenumber && errors.phonenumber}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password..."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Date Picker for Birth Date */}
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Birth Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.birthDate}
                name="birthDate"
                error={!!touched.birthDate && !!errors.birthDate}
                helperText={touched.birthDate && errors.birthDate}
                InputLabelProps={{ shrink: true }}
                sx={{ gridColumn: "span 4" }}
              />
              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("profileImage", file);

                  // Preview image
                  const reader = new FileReader();
                  reader.onloadend = () => setPreviewImage(reader.result);
                  if (file) reader.readAsDataURL(file);
                }}
                style={{ gridColumn: "span 4", marginBottom: "10px" }}
              />

              {/* Image Preview */}
              {previewImage && (
                <Box
                  display="flex"
                  position="relative"
                  sx={{ width: "100px", height: "100px" }}
                >
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <CloseIcon
                    sx={{ position: "absolute", right: "0", cursor: "pointer" }}
                    onClick={() => {
                      setPreviewImage(null);
                      setFieldValue("profileImage", null); // Clear Formik's state
                      if (fileInputRef.current) {
                        fileInputRef.current.value = ""; // Reset file input
                      }
                    }}
                  />
                </Box>
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      {/* Snackbar for success message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* Snackbar for success error message */}
      <Snackbar
        open={openSnackbarerror}
        autoHideDuration={2000} 
        onClose={() => setOpenSnackbarerror(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbarerror(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
         {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  phonenumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  password: yup.string().required("required"),
  birthDate: yup.date().required("Birth date is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  phonenumber: "",
  password: "",
  birthDate: "",
  profileImage: null,
};

export default Form;

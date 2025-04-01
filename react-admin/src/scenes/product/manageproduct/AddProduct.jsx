import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../../component/Header";
import useBakeryStore from "../../../zustand/storage";
import { createProduct } from "../../../api/product";
import { NumericFormat } from "react-number-format";
import SnackbarNotification from "../../../component/SneakerBar";

const AddProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const categorys = useBakeryStore((state) => state.categorys);
  const getCategory = useBakeryStore((state) => state.getCategory);
  const token = useBakeryStore((state) => state.token);
  const getProduct = useBakeryStore((state) => state.getProducts);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" or "error"

  useEffect(() => {
    getCategory();
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const formData = new FormData();

      // Append all other form fields
      Object.keys(values).forEach((key) => {
        if (key === "image") {
          if (values.image) {
            formData.append("image", values.image);
          }
        } else {
          formData.append(key, values[key]);
        }
      });
      const res = await createProduct(formData);
      console.log(res);
      setSeverity("success");
      setSnackbarMessage("Create Item success.");
      setOpenSnackbar(true);

      // Reset form after submission
      resetForm(); // Reset Formik values
      setPreviewImage(null); // Clear image preview
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset file input
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" />

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
                label="Name Product..."
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4" }}
              />
              <NumericFormat
                customInput={TextField}
                thousandSeparator={true}
                fullWidth
                variant="filled"
                prefix="₭  "
                type="text"
                label="Price..."
                onBlur={handleBlur}
                onValueChange={(values) => setFieldValue("price", values.value)}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
              <NumericFormat
                customInput={TextField}
                thousandSeparator={true}
                fullWidth
                variant="filled"
                prefix="₭  "
                type="text"
                label="Sell Price..."
                onBlur={handleBlur}
                onValueChange={(values) =>
                  setFieldValue("sellprice", values.value)
                }
                value={values.sellprice}
                name="sellprice"
                error={!!touched.sellprice && !!errors.sellprice}
                helperText={touched.sellprice && errors.sellprice}
                sx={{ gridColumn: "span 4" }}
              />

              {/* Select Category */}

              <FormControl fullWidth>
                <InputLabel id="category-label">CATEGORY</InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={values.category} // ✅ This will now default to "" instead of []
                  onChange={(event) => {
                    setFieldValue("category", Number(event.target.value)); // ✅ Convert to number
                  }}
                >
                  {categorys?.map((cate) => (
                    <MenuItem key={cate.id} value={cate.id}>
                      {cate.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Select LifeTime */}

              <FormControl fullWidth>
                <InputLabel id="category-label">LifeTime</InputLabel>
                <Select
                  labelId="lifetime-label"
                  id="lifetime-select"
                  value={values.lifetime} // ✅ This will now default to "" instead of []
                  onChange={(event) => {
                    setFieldValue("lifetime", Number(event.target.value)); // ✅ Convert to number
                  }}
                >
                  <MenuItem value={1}>1 Day</MenuItem>
                  <MenuItem value={2}>2 Day</MenuItem>
                  <MenuItem value={3}>3 Day</MenuItem>
                  <MenuItem value={4}>4 Day</MenuItem>
                  <MenuItem value={5}>5 Day</MenuItem>
                  <MenuItem value={6}>6 Day</MenuItem>
                  <MenuItem value={7}>7 Day</MenuItem>
                  <MenuItem value={8}>8 Day</MenuItem>
                  <MenuItem value={9}>9 Day</MenuItem>
                  <MenuItem value={10}>10 Day</MenuItem>
                </Select>
              </FormControl>
              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("image", file);

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
                      setFieldValue("image", null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
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
  name: yup.string().required("Required"),
  price: yup.number().required("Required"),
  price: yup.number().required("Required"),
  sellprice: yup.number().required("Required"),
  category: yup
    .number()
    .typeError("Select a valid category") // Ensures a number is selected
    .required("Category is required"),
  lifetime: yup
    .number()
    .typeError("Select a valid category") // Ensures a number is selected
    .required("lifetime is required"),
});

const initialValues = {
  name: "",
  price: "",
  sellprice: "",
  category: "", // ✅ Change this from [] to ""
  lifetime: "", //
  image: null,
};

export default AddProduct;

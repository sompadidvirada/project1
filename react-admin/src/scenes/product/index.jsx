import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import useBakeryStore from "../../zustand/storage";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../component/Header";
import { deleteProduct, updateProduct } from "../../api/product";
import SnackbarNotification from "../../component/SneakerBar";
import { NumericFormat } from "react-number-format";

const Product = () => {
  const token = useBakeryStore((state) => state.token);
  const products = useBakeryStore((state) => state.products);
  const getProdct = useBakeryStore((state) => state.getProducts);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const categorys = useBakeryStore((state) => state.categorys);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" or "error"
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  // Modal state and form data
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    price: "",
    sellprice: "",
    categoryId: "",
    lifetime: "",
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image
  const [imagePreview, setImagePreview] = useState(null); // To store image preview URL

  const handleOpen = (product) => {
    setEditProduct(product);
    setSelectedImage(null); // Reset image selection when opening the modal

    // Check if the product has an image
    if (product.image) {
      // If product has image, create the preview URL
      const imageUrl = `http://localhost:5003/uploads/${product.image}`;
      setImagePreview(imageUrl); // Set imagePreview to the image URL
    } else {
      setImagePreview(null); // If no image, reset the image preview
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({ ...editProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file selected by the user
    if (file) {
      setSelectedImage(file); // Store the selected image in the state

      // Create a preview of the selected image using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview image data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmitEdit = async () => {
    // Create a FormData object to send the data and image together
    const formData = new FormData();
    formData.append("id", editProduct.id);
    formData.append("name", editProduct.name);
    formData.append("price", editProduct.price);
    formData.append("sellprice", editProduct.sellprice);
    formData.append("categoryId", editProduct.categoryId);
    formData.append("lifetime", editProduct.lifetime);
    if (selectedImage) {
      formData.append("image", selectedImage); // Append the image file if selected
    }

    const update = await updateProduct(editProduct.id, formData, token);
    console.log(update);
    // Send the formData with the updated product information
    // Example: await updateProductApi(formData);
    // Log the FormData
    setSeverity("success");
    setSnackbarMessage(update.data.message || "Update Success.");
    setOpenSnackbar(true);
    getProdct();
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "image",
      headerName: "PICTURE",
      flex: 0.5,
      renderCell: (params) => {
        const imageUrl = params.row.image
          ? `http://localhost:5003/uploads/${params.row?.image}`
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
      flex: 1,
      align: "left",
      renderCell: (params) => (
        <Typography variant="laoText" fontWeight="bold" color={colors.grey[100]}>
          {params?.value}
        </Typography>
      ),
    },
    {
      field: "category",
      headerName: "CATEGORY",
      type: "text",
      headerAlign: "left",
      flex: 1,
      align: "left",
      renderCell: (params) => {

        return params.row.category ? <Typography variant="laoText" fontWeight="bold" color={colors.grey[100]}>{params.row.category.name}</Typography> : "No Category";
      },
    },
    {
      field: "price",
      headerName: "PRICE",
      flex: 1,
      renderCell: (params) => (
        <NumericFormat
          value={params.value}
          displayType="text"
          thousandSeparator={true}
          prefix="₭  " // or any currency symbol you'd like
          decimalScale={0} //
          fixedDecimalScale={true}
        />
      ),
    },
    {
      field: "sellprice",
      headerName: "SELL PRICE",
      flex: 1,
      renderCell: (params) => (
        <NumericFormat
          value={params.value}
          displayType="text"
          thousandSeparator={true}
          prefix="₭  "
          decimalScale={0}
          fixedDecimalScale={true}
        />
      ),
    },
    {
      field: "lifetime",
      headerName: "LIFE TIME",
      flex: 1,
    },
    {
      field: "manage",
      headerName: "MANAGE",
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="space-around" width="100%">
            <EditIcon
              onClick={() => handleOpen(params.row)}
              sx={{
                cursor: "pointer",
                color: colors.blueAccent[500],
                "&:hover": {
                  color: colors.blueAccent[700],
                },
              }}
            />
            <DeleteIcon
              onClick={() => handleDelete(params.row.id)}
              sx={{
                cursor: "pointer",
                color: colors.redAccent[500],
                "&:hover": {
                  color: colors.redAccent[700],
                },
              }}
            />
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    getProdct();
  }, [token]);

  const handleDelete = async (id) => {
    console.log(`Delete product with ID: ${id}`);

    try {
      const deletePro = await deleteProduct(id, token);
      console.log(deletePro);
      setSnackbarMessage(deletePro.data || "Delete product success.");
      setSeverity("success");
      setOpenSnackbar(true);
      getProdct();
    } catch (err) {
      console.log(err);
      setSnackbarMessage("Something went wrong.");
      setSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setOpenImageModal(true);
  };
  // Function to close the image modal
  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImageUrl(null);
  };

  return (
    <Box m="20px">
      <Header
        title="PRODUCT"
        subtitle="List of Products for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        <DataGrid
          rows={products || ""}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
        />
      </Box>
      {/* Modal Edit Product Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct.name}
            onChange={handleEditChange}
            name="name"
          />
          <NumericFormat
            customInput={TextField}
            thousandSeparator={true}
            prefix="₭  "
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct.price}
            onValueChange={(values) =>
              setEditProduct({ ...editProduct, price: values.value })
            }
            name="price"
          />
          <NumericFormat
            customInput={TextField}
            thousandSeparator={true}
            prefix="₭  "
            label="Sell Price"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProduct.sellprice}
            onValueChange={(values) =>
              setEditProduct({ ...editProduct, sellprice: values.value })
            }
            name="sellprice"
          />

          <Box display="flex" gap="10px">
            {/* Select LifeTime */}

            <FormControl sx={{ mt: "10px" }}>
              <InputLabel id="category-label">LIFE TIME</InputLabel>
              <Select
                labelId="lifetime-label"
                id="lifetime-select"
                value={editProduct.lifetime} // ✅ This will now default to "" instead of []
                onChange={(event) => {
                  setEditProduct({
                    ...editProduct,
                    lifetime: Number(event.target.value),
                  }); // ✅ Convert to number
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
            {/* Select Category */}

            <FormControl sx={{ mt: "10px" }}>
              <InputLabel id="category-label">CATEGORY</InputLabel>
              <Select
                labelId="category-label"
                id="category-select"
                value={editProduct.categoryId} // ✅ This will now default to the selected category ID
                onChange={(event) => {
                  // Update the categoryId in editProduct state
                  setEditProduct({
                    ...editProduct,
                    categoryId: Number(event.target.value),
                  });
                }}
              >
                {categorys?.map((cate) => (
                  <MenuItem key={cate.id} value={cate.id}>
                    {cate.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box mt={2}>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              fullWidth
            />
            {imagePreview && (
              <Box mt={2}>
                <img
                  src={imagePreview}
                  alt="Selected"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginTop: "10px",
                  }}
                  onClick={() => handleImageClick(imagePreview)}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={colors.redAccent[100]}>
            Cancel
          </Button>
          <Button onClick={handleSubmitEdit} color={colors.redAccent[100]}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
      ;{/* Snackbar for success message */}
      <SnackbarNotification
        open={openSnackbar}
        message={snackbarMessage}
        severity={severity}
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
};

export default Product;

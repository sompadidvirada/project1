import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import useBakeryStore from "../../zustand/storage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ListIcon from "@mui/icons-material/List";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarNotification from "../../component/SneakerBar";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const user = useBakeryStore((state) => state.user);
  const token = useBakeryStore((state) => state.token);
  const [open, setOpen] = useState(false);
  const [editProflie, setEditProfile] = useState({
    id: null,
    firstname: "",
    lastname: "",
    phonenumber: "",
    image: "",
  });
  const [selectedImage, setSelectedImage] = useState(null); // To store the selected image
  const [imagePreview, setImagePreview] = useState(null); // To store image preview URL
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // "success" or "error"
  const updateUser = useBakeryStore((state) => state.updateUser);

  const handleImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setOpenImageModal(true);
  };
  // Function to close the image modal
  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setSelectedImageUrl(null);
  };

  const handleOpen = (product) => {
    setEditProfile(product);
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
    setEditProfile({ ...editProflie, [name]: value });
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
    formData.append("id", editProflie.id);
    formData.append("firstname", editProflie.firstname);
    formData.append("lastname", editProflie.lastname);
    formData.append("phonenumber", editProflie.phonenumber);
    if (selectedImage) {
      formData.append("image", selectedImage); // Append the image file if selected
    }
    const update = await updateUser(formData);

    // Send the formData with the updated product information
    // Example: await updateProductApi(formData);
    // Log the FormData
    setSeverity("success");
    setSnackbarMessage("Update Success.");
    setOpenSnackbar(true);
    setOpen(false);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/** LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  TREEKOFF
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="80px"
                  height="80px"
                  onClick={() =>
                    handleImageClick(
                      `http://localhost:5003/uploads/${user.image}`
                    )
                  }
                  src={`http://localhost:5003/uploads/${
                    user.image || "nigler.png"
                  }`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.firstname + ` ` + user.lastname || "EMTY NAME"}
                </Typography>
                <Box display="flex" justifyContent="center">
                  <Typography variant="h5" color={colors.greenAccent[500]}>
                    {user.role || "EMTY"}
                  </Typography>
                  <ManageAccountsIcon
                    onClick={() => handleOpen(user)}
                    sx={{
                      ml: "6px",
                      cursor: "pointer",
                      "&:hover": { color: colors.grey[100] },
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}

          {/** MENU ITEM */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage User
            </Typography>
            <Item
              title="Create User"
              to="/admin/form"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage Products
            </Typography>
            <SubMenu
              title="Products"
              icon={<BakeryDiningIcon />}
              style={{ color: colors.grey[100] }}
            >
              <Item
                title="Add Product"
                to="/admin/addproduct"
                icon={<AddCircleOutlineIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Manage Product"
                to="/admin/manageproduct"
                icon={<ListIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
            <Item
              title="Manage brach-Category"
              to="/admin/managecatebrach"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage Data
            </Typography>

            <SubMenu
              title="Data"
              icon={<WorkIcon />}
              style={{ color: colors.grey[100] }}
            >
              <Item
                title="Tracking Sell"
                to="/admin/tracksell"
                icon={<AttachMoneyIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Tracking Send"
                to="/admin/tracksend"
                icon={<DeliveryDiningIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Tracking EXP"
                to="/admin/trackexp"
                icon={<AutoDeleteIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <Item
              title="Calendar"
              to="/admin/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ"
              to="/admin/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Chart Data
            </Typography>
            <Item
              title="Bar Chart"
              to="/admin/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/admin/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/admin/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
           
          </Box>
        </Menu>
      </ProSidebar>

      {/* USER PROFLIE */}
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
              src={selectedImageUrl || "nigler.png"}
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

      {/* Modal Edit Product Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="firstname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProflie.firstname}
            onChange={handleEditChange}
            name="firstname"
          />
          <TextField
            label="lastname"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProflie.lastname}
            onChange={handleEditChange}
            name="lastname"
          />
          <TextField
            label="phonenumber"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editProflie.phonenumber}
            onChange={handleEditChange}
            name="phonenumber"
          />

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
                    cursor: "pointer",
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

export default Sidebar;

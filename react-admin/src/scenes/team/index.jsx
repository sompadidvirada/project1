import {
  Alert,
  Box,
  MenuItem,
  Select,
  Snackbar,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../component/Header";
import useBakeryStore from "../../zustand/storage";
import { useEffect, useState } from "react";
import { getAllUser, updateUserRole, updateUserStatus } from "../../api/form";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = useBakeryStore((state) => state.token);
  const [users, setUsers] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // Track editing row
  const [editingRowStatus, setEditingStatus] = useState(null); // Track editing row
  const roles = ["admin", "user"]; // Available roles
  const status = [true, false]; // Available roles
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await getAllUser(token);
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await updateUserRole(userId, newRole, token); // API call to update role
      console.log(res);
      setSnackbarMessage(res.data.message || "Update successful!"); // Use API response message
      setOpenSnackbar(true);
      setEditingRow(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };
  const handleStatusChange = async (userId, newRole) => {
    try {
      const res = await updateUserStatus(userId, newRole, token); // API call to update role
      console.log(res);
      setSnackbarMessage(res.data.message || "Update successful!"); // Use API response message
      setOpenSnackbar(true);
      setEditingStatus(null);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "firstname",
      headerName: "FIRSTNAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastname",
      headerName: "LASTNAME",
      type: "number",
      headerAlign: "left",
      align: "left",
      cellClassName: "age-column--cell",
    },
    {
      field: "phonenumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "status",
      headerName: "STATUS",
      flex: 1,
      cellClassName: "sttclass",
      renderCell: ({ row }) => {
        return editingRowStatus === row.id ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <Select
              value={row.status}
              onChange={(e) => handleStatusChange(row.id, e.target.value)}
              sx={{
                textAlign: "center",
                width: "60%",
                height: "60%",
                bgcolor:
                  row.status === true
                    ? colors.greenAccent[700]
                    : colors.redAccent[500],
                color: "#fff",
              }}
            >
              {status.map((stt) => (
                <MenuItem key={stt} value={stt}>
                  {stt === true ? `enable` : `Disable`}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ) : (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            backgroundColor={
              row.status === true
                ? colors.greenAccent[700]
                : colors.redAccent[500]
            }
            borderRadius="4px"
            onClick={() => setEditingStatus(row.id)} // Click to edit
          >
            {row.status === true && <AdminPanelSettingsOutlinedIcon />}
            {row.status === false && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.status === true ? `enable` : `Dissible`}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "role",
      headerName: "ROLE",
      flex: 1,
      cellClassName: "icon-column--cell",
      renderCell: ({ row }) => {
        return editingRow === row.id ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <Select
              value={row.role}
              onChange={(e) => handleRoleChange(row.id, e.target.value)}
              sx={{
                textAlign: "center",
                width: "60%",
                height: "60%",
                bgcolor: colors.greenAccent[700],
                color: "#fff",
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ) : (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            backgroundColor={
              row.role === "admin"
                ? colors.greenAccent[700]
                : colors.greenAccent[800]
            }
            borderRadius="4px"
            onClick={() => setEditingRow(row.id)} // Click to edit
          >
            {row.role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {row.role === "manager" && <SecurityOutlinedIcon />}
            {row.role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.role}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the team member." />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .icon-column--cell": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .sttclass": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .age-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeader": {
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
        }}
      >
        <DataGrid rows={users} columns={columns} />
        {/* Snackbar for success message */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000} // Hide after 3 seconds
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
      </Box>
    </Box>
  );
};

export default Team;

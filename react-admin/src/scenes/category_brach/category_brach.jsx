import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts, mockDataInvoices } from "../../data/mockData";
import Header from "../../component/Header";
import { useTheme } from "@mui/material";
import Addcategory from "./Addcategory";
import ListCategory from "./ListCategory";
import AddBrach from "./AddBrach";
import ListBrach from "./ListBrach";

const Invoice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      rederCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px" textAlign="center">
      <Header title="Manage Category and Brach" />
      <Box
        mt="30px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="700px"
        gap="20px"
      >
        {/* Section 1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex flex-row"
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
          sx={{
            width: "100%",
            height: "100%",
            textDecoration: "none", // Ensure no underline
          }}
        >
          <Box
            width="95%"
            height="20%"
            margin="10px"
            sx={{ backgroundColor: colors.grey[500] }}
          >
            <Addcategory />
          </Box>
          <Box
            width="95%"
            height="72%"
            margin="10px"
            sx={{ backgroundColor: colors.grey[500] }}
          >
            <ListCategory />
          </Box>
        </Box>

        {/* Section 2 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex flex-row"
          alignItems="center"
          justifyContent="center"
          justifyItems="center"
          sx={{
            width: "100%",
            height: "100%",
            textDecoration: "none", // Ensure no underline
          }}
        >
          <Box
            width="95%"
            height="20%"
            margin="10px"
            sx={{ backgroundColor: colors.grey[500] }}
          >
            <AddBrach />
          </Box>
          <Box
            width="95%"
            height="72%"
            margin="10px"
            sx={{ backgroundColor: colors.grey[500] }}
          >
            <ListBrach />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Invoice;

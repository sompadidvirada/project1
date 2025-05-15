import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../component/Header";
import { useTheme } from "@mui/material";
import Addcategory from "./Addcategory";
import ListCategory from "./ListCategory";
import AddBrach from "./AddBrach";
import ListBrach from "./ListBrach";

const Invoice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

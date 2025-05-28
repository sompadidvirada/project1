import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useBakeryStore from "../../../zustand/storage";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";

export default function SelectBrach({
  selectFormtracksell,
  setSelectFormtracksell,
  setSelectDateBrachCheck,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const brach = useBakeryStore((state) => state.brach);
  const getBrach = useBakeryStore((state) => state.getBrach);
  const token = useBakeryStore((state) => state.token);
  const getProducts = useBakeryStore((state)=>state.getProducts)

  React.useEffect(() => {
    getBrach();
  }, [token]);

  const handleChange = (event) => {
    setSelectFormtracksell((prevState) => ({
      ...prevState, // Keep existing state values
      brachId: event.target.value, // Update only brachId
    }));
    setSelectDateBrachCheck((prevState) => ({
      ...prevState, // Keep existing state values
      brachId: event.target.value, // Update only brachId
    }));
    getProducts()
  };

  return (
    <div>
      <FormControl sx={{ m: "2px", minWidth: 160, textAlign: "center" }}>
        <InputLabel id="demo-simple-select-helper-label">
          <Typography
            variant="laoText"
            fontWeight="bold"
            color={colors.grey[100]}
          >
            ເລືອກສາຂາ
          </Typography>
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectFormtracksell.brachId}
          onChange={handleChange}
        >
          <MenuItem value="">
            <Typography variant="h5" fontWeight="bold" color={colors.grey[100]}>
              NONE
            </Typography>
          </MenuItem>
          {Array.isArray(brach) && brach.length > 0 ? (
            brach.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                <Typography
                  variant="laoText"
                  fontWeight="bold"
                  color={colors.grey[100]}
                >
                  {item.name}
                </Typography>
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              <Typography variant="h5" color="error">
                No branches available
              </Typography>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}

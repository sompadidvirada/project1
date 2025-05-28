import React, { useEffect } from "react";
import { tokens } from "../../../theme";
import useBakeryStore from "../../../zustand/storage";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";

const SelectBrachProduct = ({ value, onChange }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const brach = useBakeryStore((state) => state.brach);
  const getBrach = useBakeryStore((state) => state.getBrach);

  useEffect(() => {
    getBrach();
  }, []);

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl
      sx={{
        minWidth: 160,
        textAlign: "center",
        height: 48, // ← sets height of FormControl (optional)
      }}
    >
      <InputLabel id="brach-label">
        <Typography
          variant="laoText"
          fontWeight="bold"
          color={colors.grey[100]}
        >
          ເລືອກສາຂາ
        </Typography>
      </InputLabel>
      <Select
        labelId="brach-label"
        value={value || ""}
        onChange={handleChange}
        sx={{
          height: 40, // ← sets height of the Select input
          fontSize: "0.9rem", // optional: adjust font size
          "& .MuiSelect-select": {
            paddingTop: 1,
            paddingBottom: 1,
          },
        }}
      >
        <MenuItem value="">
          <Typography variant="h5" fontWeight="bold" color={colors.grey[100]}>
            NONE
          </Typography>
        </MenuItem>
        {Array.isArray(brach) && brach.length > 0 ? (
          brach.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: colors.greenAccent[700],
                  color: colors.grey[100], // optional: to override text color
                },
                "&.Mui-selected:hover": {
                  backgroundColor: colors.greenAccent[600],
                },
              }}
            >
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
  );
};

export default SelectBrachProduct;

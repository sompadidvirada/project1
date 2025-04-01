import React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Function to handle styles for selected items
const getStyles = (id, selectedValues, theme) => ({
  fontWeight: selectedValues.some((item) => item.id === id)
    ? theme.typography.fontWeightMedium
    : theme.typography.fontWeightRegular,
});

const MultiSelect = ({ label, options, value, onChange }) => {
  const theme = useTheme();

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={(event) => {
          const selectedIds = event.target.value;
          const selectedObjects = options.filter((option) => selectedIds.includes(option.id));
          onChange(selectedObjects);
        }}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.map((item) => item.name).join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id} style={getStyles(option.id, value, theme)}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;

import {
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";

const SelectStatus = ({ value, onChange }) => {
  const handleOnselect = (event) => {
    onChange(event.target.value === "true");
  };

  return (
    <FormControl sx={{ minWidth: 160, textAlign: "center" }}>
      <Select
        labelId="status-select-label"
        value={typeof value === "boolean" ? String(value) : ""}
        onChange={handleOnselect}
        displayEmpty
      >
        <MenuItem value="">
          <Typography>Select Status</Typography>
        </MenuItem>
        <MenuItem value="true">
          <Typography>AVAILABLE</Typography>
        </MenuItem>
        <MenuItem value="false">
          <Typography>UNAVAILABLE</Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
};


export default SelectStatus;

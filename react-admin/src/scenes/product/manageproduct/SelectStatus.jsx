import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

const SelectStatus = ({ value, onChange }) => {
  const handleOnselect = (event) => {
    onChange(event.target.value === "true");
  };

  return (
    <FormControl sx={{ minWidth: 160, textAlign: "center", height: 48 }}>
      <Select
        labelId="status-select-label"
        value={typeof value === "boolean" ? String(value) : ""}
        onChange={handleOnselect}
        displayEmpty
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

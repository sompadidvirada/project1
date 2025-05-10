// src/pages/tracking/BranchDataGrid.js

import React from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../component/Header";

const BranchDataGrid = ({ branch, columns }) => {
  return (
    <Box sx={{ mb: "30px" }}>
      <Header
        title={
          <Typography variant="laoText" sx={{ fontSize: 30 }}>
            {`${branch.name} (Expired %: ${branch.branchPercent}) ຫມົດອາຍຸທັງຫມົດ ${branch.totalExp.toLocaleString()} ກີບ`}
          </Typography>
        }
      />
      <DataGrid
        rows={branch.rowsWithPercent}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        disableSelectionOnClick
        pagination
        pageSize={10}
      />
    </Box>
  );
};

export default BranchDataGrid;

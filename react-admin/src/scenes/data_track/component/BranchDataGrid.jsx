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
          <Box display={"flex"} gap={3} justifySelf={'center'}>
            <Typography variant="laoText" sx={{ fontSize: 30 }}>
              {`${branch?.name} (Expired %: ${branch?.branchPercent || ""})`}{" "}
            </Typography>
            <Typography
              variant="laoText"
              sx={{ fontSize: 30, color: "rgb(83, 129, 255)" }}
            >
              SEND {branch?.totalSend.toLocaleString() || ""} ກີບ
            </Typography>{" "}
            <Typography
              variant="laoText"
              sx={{ fontSize: 30, color: "rgb(0, 255, 136)" }}
            >
              {" "}
              SELL {branch?.totalSell.toLocaleString() || ""} ກີບ
            </Typography>
            <Typography
              variant="laoText"
              sx={{ fontSize: 30, color: "rgb(255, 40, 33)" }}
            >
              EXP {branch?.totalExp?.toLocaleString() || ""} ກີບ
            </Typography>
          </Box>
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

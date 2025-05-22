import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React, { useEffect } from "react";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { EmployeeInfo } from "../data/MockData";
import useTreekoffStorage from "../../../zustand/storageTreekoff";

const EmployeeDetail = () => {
  const emplyyeeInfo = useTreekoffStorage((state) => state.employeeInfo);
  const setEmployeeInfo = useTreekoffStorage((state) => state.setEmplyeeInfo);

  useEffect(() => {
    setEmployeeInfo(EmployeeInfo);
  }, [EmployeeInfo]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        height: "350px",
        bgcolor: "blue",
        borderRadius: "5px",
      }}
    >
      <Card
        sx={{
          bgcolor: "#ffffff",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia
          sx={{
            height: "115px",
            width: "115px",
            borderRadius: "50%",
            marginTop: 2,
          }}
          image={emplyyeeInfo?.image || ""}
          title="profile picture"
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "90%",
            borderBottom: "1px solid black",
          }}
        >
          <Typography
            variant="laoText"
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {emplyyeeInfo?.username || "EMTY"}
          </Typography>
          <Typography
            variant="laoText"
            sx={{
              color: "black",
              fontSize: 12,
            }}
          >
            {emplyyeeInfo?.position || "EMTY"}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            width: "90%",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          <Typography variant="laoText" color="black" fontWeight="bold">
            ປະຈຳສາຂາ
          </Typography>
          <Typography variant="laoText" color="black" display="flex">
            <LocationCityIcon />
            {emplyyeeInfo?.brach || "EMTY"}
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            width: "90%",
            borderBottom: "1px solid black",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          <Typography variant="laoText" color="black" fontWeight="bold">
            ແຕ້ມສະສົມພະນັກງານ
          </Typography>
          <Typography variant="laoText" color="black" display="flex">
            {emplyyeeInfo?.point.toLocaleString() || "0"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeDetail;

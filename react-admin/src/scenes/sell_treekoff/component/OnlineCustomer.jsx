import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import MonitorIcon from "@mui/icons-material/Monitor";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";

const OnlineCustomer = ({ setSelectOnline, openWindow}) => {
  return (
    <Box
            sx={{
              bgcolor: "green",
              height: "350px",
              borderRadius: "5px",
            }}
          >
            <Card
              sx={{
                bgcolor: "#ffffff",
                height: "100%",
                width: "100%",
                color: "black",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid black",
                  width: "90%",
                }}
              >
                <MonitorIcon
                  sx={{
                    alignSelf: "center",
                    marginRight: 1,
                  }}
                />
                <Typography variant="laoText" sx={{ fontSize: 20 }}>
                  ເລືອກໜ້າຕ່າງການຂາຍ
                </Typography>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid black",
                  width: "90%",
                }}
              >
                <Button
                onClick={()=> openWindow()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 20,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    sx={{ height: 50, width: 74 }}
                    image="/assests/TK.png"
                    title="TREEKOFF"
                  />
                  <Typography
                    variant="h5"
                    color="black"
                    fontWeight="bold"
                    sx={{
                      display: "flex",
                      color: "blue",
                    }}
                  >
                    {" "}
                    CUSTOMER SCREEN
                  </Typography>
                </Button>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid black",
                  width: "90%",
                }}
              >
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 20,
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => setSelectOnline(false)}
                >
                  <CardMedia
                    sx={{ height: 50, width: 74 }}
                    image="/assests/TK.png"
                    title="TREEKOFF"
                  />
                  <Typography
                    variant="h5"
                    color="black"
                    fontWeight="bold"
                    sx={{
                      display: "flex",
                      color: "blue",
                    }}
                  >
                    {" "}
                    TREEKOFF
                  </Typography>
                </Button>
              </CardContent>
              <CardContent
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  borderBottom: "1px solid black",
                  width: "90%",
                }}
              >
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: 20,
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => setSelectOnline(true)}
                >
                  <CardMedia
                    sx={{ height: 50, width: 74 }}
                    image="/assests/TK.png"
                    title="TREEKOFF"
                  />
                  <Typography
                    variant="h5"
                    color="black"
                    fontWeight="bold"
                    sx={{
                      display: "flex",
                      color: "blue",
                    }}
                  >
                    <PhoneAndroidIcon /> TREEKOFF(ONLINE)
                  </Typography>
                </Button>
              </CardContent>
            </Card>
          </Box>
  )
}

export default OnlineCustomer
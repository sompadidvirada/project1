import React from "react";
import { forwardRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../component/Header";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import useBakeryStore from "../../zustand/storage";
import {
  createCalendar,
  deleteCalendar,
  getCalendarAdmin,
  updateCalendar,
} from "../../api/calendar";
import { useEffect } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CalendarForAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventContext, setNewEventContext] = useState("");
  const user = useBakeryStore((state) => state.user);
  const [calendarad, setCalendarad] = useState([]) || ""
  const [newEvent, setNewEvent] = useState({
    suplyer: "",
    description: "",
    poLink: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetailOpen, setEventDetailOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const [endDate, setEndDate] = useState(dayjs().endOf("month"));

  const getCalen = async () => {
    try{
      const ress = await getCalendarAdmin()
      setCalendarad(ress.data)
    }catch(err){
      console.log()
    }
  }
  useEffect( () => {
  getCalen()
  }, []);
  const [selectedDateInfo, setSelectedDateInfo] = useState(null); // for storing the calendar selection

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDateClick = (selected) => {
    setSelectedDateInfo(selected); // Save selection for use after dialog submit
    setNewEventTitle(""); // Clear any previous title
    setOpen(true); // Open the dialog
  };

  const handleAddEvent = async () => {
    if (newEvent.suplyer && selectedDateInfo) {
      const calendarApi = selectedDateInfo.view.calendar;
      calendarApi.unselect();

      calendarApi.addEvent({
        id: `${selectedDateInfo.dateStr}-${newEvent.suplyer}`,
        title: newEvent.suplyer,
        start: selectedDateInfo.startStr,
        end: selectedDateInfo.endStr,
        allDay: selectedDateInfo.allDay,
        extendedProps: {
          description: newEvent.description,
          poLink: newEvent.poLink,
        },
      });

      const formData = {
        suplyer: newEvent.suplyer,
        polink: newEvent.poLink || "",
        discription: newEvent.description || "",
        userId: user.id,
        date: new Date(selectedDateInfo.startStr), // converts string to Date
      };

      const respone = await createCalendar(formData);

      getCalen()

      setOpen(false);
      setSelectedDateInfo(null);
      setNewEvent({ suplyer: "", description: "", poLink: "" });
    }
  };

  const handleEventClick = async (selected) => {
    const confirmed = window.confirm(`ຢືນຢັນການລົບ`);
    if (confirmed) {
      try {
        const eventId = selected.event.id;

        // 👉 Call your delete API here
        await deleteCalendar(eventId); // You'll define this in your `api/calendar.js`

        // 👉 Remove the event from the calendar UI
        selected.event.remove();

        // 👉 Refresh the calendar state from backend
    getCalen()

        console.log(`Event ${eventId} deleted successfully.`);
      } catch (error) {
        console.error("Failed to delete event:", error);
        alert("ລົບເຫດການບໍ່ສຳເລັດ");
      }
    }
  };

  const handleInputChange = (field) => (e) => {
    setNewEvent((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };
  const handleEventDrop = async (info) => {
    const { event } = info;

    const updatedData = {
      suplyer: event.title,
      polink: event.extendedProps?.poLink || "",
      discription: event.extendedProps?.description || "",
      date: new Date(event.start),
    };

    // Assuming your event has a unique id stored in `event.id`
    console.log(updatedData);
    const updateCalen = await updateCalendar(event.id, updatedData);

    console.log(`Update success,${updateCalen}`);

    // Refresh events
getCalen()
  };

  return (
    <Box m="20px">
      <Header title="CALENDAR" />
      <Box display={"flex"} marginBottom={2}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ display: "flex", gap: "10px" }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </div>
        </LocalizationProvider>
      </Box>
      <Box display="flex" justifyContent="space-between">
        {/**CALENDAR SIDE BAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          height={550}
          overflow={"auto"}
        >
          <Typography fontFamily={"Noto Sans Lao"}>ລາຍລະອຽດ</Typography>
          <List>
            {calendarad
              ? calendarad
                  .filter((event) => {
                    const eventDate = dayjs(event.start).startOf("day");
                    return (
                      eventDate.isSame(startDate, "day") ||
                      eventDate.isSame(endDate, "day") ||
                      (eventDate.isAfter(startDate, "day") &&
                        eventDate.isBefore(endDate, "day"))
                    );
                  })
                  .map((event, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        backgroundColor: colors.greenAccent[500],
                        margin: "10px 0",
                        borderRadius: "2px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedEvent(event);
                        setEventDetailOpen(true);
                      }}
                    >
                      <Box padding={0}>
                        <Typography
                          fontFamily={"Noto Sans Lao"}
                          fontWeight="bold"
                        >
                          {event.title}
                        </Typography>
                        <Typography fontFamily={"Noto Sans Lao"}>
                          {formatDate(event.start, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))
              : ""}
          </List>
        </Box>
        {/**CALENDAR */}

        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            events={calendarad}
            eventDrop={handleEventDrop} // Add this line
          />
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontFamily: "Noto Sans Lao" }}>
          ເພີ່ມລາຍລະອຽດ
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ບໍລິສັດຜູ້ສະໜອງ"
            fullWidth
            InputLabelProps={{
              sx: { fontFamily: "Noto Sans Lao" },
            }}
            variant="standard"
            value={newEvent.suplyer}
            onChange={handleInputChange("suplyer")}
          />
          <TextField
            margin="dense"
            label="ລາຍລະອຽດ"
            fullWidth
            InputLabelProps={{
              sx: { fontFamily: "Noto Sans Lao" },
            }}
            variant="standard"
            value={newEvent.description}
            onChange={handleInputChange("description")}
          />
          <TextField
            margin="dense"
            label="ລີ້ງພີໂອ"
            fullWidth
            InputLabelProps={{
              sx: { fontFamily: "Noto Sans Lao" },
            }}
            variant="standard"
            value={newEvent.poLink}
            onChange={handleInputChange("poLink")}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            sx={{ fontFamily: "Noto Sans Lao" }}
            onClick={handleClose}
          >
            ຍົກເລີກ
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ fontFamily: "Noto Sans Lao" }}
            onClick={handleAddEvent}
          >
            ເພີ່ມບັນທືກ
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={eventDetailOpen}
        onClose={() => setEventDetailOpen(false)}
        TransitionComponent={Transition}
      >
        <DialogTitle
          sx={{
            fontFamily: "Noto Sans Lao",
            alignSelf: "center",
            fontSize: 25,
          }}
        >
          ລາຍລະອຽດ
        </DialogTitle>
        <DialogContent
          sx={{ width: "80vh", display: "flex", flexDirection: "column" }}
        >
          <Box
            borderBottom={"1px solid"}
            display={"flex"}
            flexDirection={"column"}
            p={2}
          >
            <Typography
              fontFamily={"Noto Sans Lao"}
              alignSelf={"center"}
              fontSize={20}
            >
              ບໍລິສັດຜູ້ສະໜອງ:
            </Typography>
            <Typography fontFamily={"Noto Sans Lao"} alignSelf={"center"}>
              {selectedEvent?.title}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            borderBottom={"1px solid"}
            p={2}
          >
            <Typography
              fontFamily={"Noto Sans Lao"}
              alignSelf={"center"}
              fontSize={20}
            >
              ວັນທີ
            </Typography>
            <Typography fontFamily="Noto Sans Lao" alignSelf={"center"}>
                {formatDate(selectedEvent?.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            borderBottom={"1px solid"}
            p={2}
          >
            <Typography
              fontFamily={"Noto Sans Lao"}
              alignSelf={"center"}
              fontSize={20}
            >
              ລາຍລະອຽດ:
            </Typography>
            <Typography fontFamily="Noto Sans Lao" alignSelf={"center"}>
              {selectedEvent?.extendedProps?.description || "ບໍ່ມີ"}
            </Typography>
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
            <Typography
              fontFamily={"Noto Sans Lao"}
              alignSelf={"center"}
              fontSize={20}
              p={2}
            >
              ລິ້ງພີໂອ
            </Typography>
            <Typography fontFamily="Noto Sans Lao" alignSelf={"center"}>
              <Link
                href={selectedEvent?.extendedProps?.poLink}
                target="_blank"
                rel="noopener"
              >
                {selectedEvent?.extendedProps?.poLink}
              </Link>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setEventDetailOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarForAdmin;

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
import { createCalendar } from "../../api/calendar";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventContext, setNewEventContext] = useState("");
  const [newEvent, setNewEvent] = useState({
    suplyer: "",
    description: "",
    poLink: "",
  });
  const user = useBakeryStore((state) => state.user);

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
        polink: newEvent.poLink,
        discription: newEvent.description,
        userId: user.id,
        date: new Date(selectedDateInfo.startStr), // converts string to Date
      };


      const respone = await createCalendar(formData)

      console.log(respone)

      setOpen(false);
      setSelectedDateInfo(null);
      setNewEvent({ suplyer: "", description: "", poLink: "" });
    }
  };

  const handleEventClick = (selected) => {
    if (window.confirm(`ຢືນຢັນການລົບ`)) {
      selected.event.remove();
    }
  };
  const handleInputChange = (field) => (e) => {
    setNewEvent((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <Box m="20px">
      <Header title="CALENDAR" subtitle="Full Calendar Interactive Page." />
      <Box display="flex" justifyContent="space-between">
        {/**CALENDAR SIDE BAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Event</Typography>
          <List>
            {currentEvents.map((event, index) => (
              <ListItem
                key={index}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  margin: "10px 0",
                  borderRadius: "2px",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="body2">
                  {formatDate(event.start, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
                <Typography variant="body2">
                  Desc: {event.extendedProps?.description}
                </Typography>
                <Typography variant="body2" component="span" sx={{ mr: 1 }}>
                  ລີ້ງພີໂອ:
                </Typography>
                <Link
                  href={event.extendedProps?.poLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  color="primary"
                >
                  {event.extendedProps?.poLink}
                </Link>
              </ListItem>
            ))}
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
          />
        </Box>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ບໍລິສັດຜູ້ສະໜອງ"
            fullWidth
            variant="standard"
            value={newEvent.suplyer}
            onChange={handleInputChange("suplyer")}
          />
          <TextField
            margin="dense"
            label="ລາຍລະອຽດ"
            fullWidth
            variant="standard"
            value={newEvent.description}
            onChange={handleInputChange("description")}
          />
          <TextField
            margin="dense"
            label="ລີ້ງພີໂອ"
            fullWidth
            variant="standard"
            value={newEvent.poLink}
            onChange={handleInputChange("poLink")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add Event</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Calendar;

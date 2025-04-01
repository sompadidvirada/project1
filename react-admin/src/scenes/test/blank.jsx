import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar"
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contact from "./scenes/contact";
import Invoice from "./scenes/invoice/Invoice";
import Form from "./scenes/form/index";
import Calendar from "./scenes/calendar";
import FAQ from "./scenes/faq";
import Bar from "./scenes/bar/Bar";
import PieChart from "./component/PieChart";
import LineChart from "./component/LineChart";
import GeographyChart from "./component/GeographyChart";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: ''
    }
])

function App() {

  const [theme, colorMode] = useMode();

  return (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="app">
        <Sidebar />
        <main className="content">
          <Topbar/>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/team" element={<Team/>}/>
            <Route path="/contacts" element={<Contact/>}/>
            <Route path="/invoices" element={<Invoice/>}/>
            <Route path="/form" element={<Form/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/faq" element={<FAQ/>}/>
            <Route path="/bar" element={<Bar/>}/>
            <Route path="/pie" element={<PieChart/>}/>
            <Route path="/line" element={<LineChart/>}/>
            <Route path="/geography" element={<GeographyChart/>}/>
          </Routes>
        </main>

      </div>
    </ThemeProvider>
      
  </ColorModeContext.Provider>

   
  );
}

export default App;

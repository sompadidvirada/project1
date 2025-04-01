import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../scenes/layout/LandingPage";
import LayoutAdmin from "../scenes/layout/LayoutAdmin";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Product from "../scenes/product";
import Invoice from "../scenes/category_brach/category_brach";
import Form from "../scenes/form";
import FAQ from "../scenes/faq";
import Bar from "../scenes/bar/Bar";
import PieChart from "../component/PieChart";
import LineChart from "../component/LineChart";
import GeographyChart from "../component/GeographyChart";
import Login from "../scenes/authen/Login";
import Singin from "../scenes/authen/Singin";
import Calendar from "../scenes/calendar";
import ProtectAdmin from "./ProtectAdmin";
import AddProduct from "../scenes/product/manageproduct/AddProduct";
import Tracksend from "../scenes/work/Tracksend";
import Trackexp from "../scenes/work/Trackexp";
import Tracksell from "../scenes/work/tracksell";
import Line from "../scenes/line/Line";
import ProtectUser from "./ProtectUser";
import LayoutUser from "../scenes/layout/LayoutUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/singin",
    element: <Singin />,
  },
  {
    path: "/admin",
    element: <ProtectAdmin element={<LayoutAdmin />} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "team", element: <Team /> },
      { path: "manageproduct", element: <Product /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "managecatebrach", element: <Invoice /> },
      { path: "form", element: <Form /> },
      { path: "tracksell", element: <Tracksell /> },
      { path: "tracksend", element: <Tracksend /> },
      { path: "trackexp", element: <Trackexp /> },
      { path: "calendar", element: <Calendar /> },
      { path: "faq", element: <FAQ /> },
      { path: "bar", element: <Bar /> },
      { path: "pie", element: <PieChart /> },
      { path: "line", element: <Line /> },
      { path: "geography", element: <GeographyChart /> }
    ],
  },
  {
    path: "/user",
    element: <ProtectUser element={<LayoutUser/>} />,
    children: [
      { index: true, element: <Tracksell />},
      { path:"tracksend" , element: <Tracksend />},
      { path: "trackexp", element: <Trackexp /> },
      { path: "manageproduct", element: <Product /> },
      { path: "addproduct", element: <AddProduct /> },
      { path: "managecatebrach", element: <Invoice /> },
      { path: "calendar", element: <Calendar /> },
      { path: "faq", element: <FAQ /> },
    ]
  }
]);

const AppRoutes = () => {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    />
  );
};
export default AppRoutes;

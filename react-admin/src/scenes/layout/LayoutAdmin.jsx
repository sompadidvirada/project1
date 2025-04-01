import { Outlet } from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useState } from "react";

const LayoutAdmin = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="layout">
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutAdmin;

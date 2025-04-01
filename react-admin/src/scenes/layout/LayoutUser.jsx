import React, { useState } from 'react'
import SidebarUser from '../global/SidebarUser';
import Topbar from '../global/Topbar';
import { Outlet } from 'react-router-dom';

const LayoutUser = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <div className="layout">
      <SidebarUser isSidebar={isSidebar} />
      <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutUser
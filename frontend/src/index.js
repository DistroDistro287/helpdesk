
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss?v=1.3.0";
import "./assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "./layouts/Admin.js";
import AllComplaints from "./views/tiles/AllComplaints.js";
import ResolvedComplaints from "./views/tiles/ResolvedComplaints.js";
import UnResolvedComplaints from "./views/tiles/UnResolvedComplaints.js";
import PendingComplaints from "./views/tiles/PendingComplaints.js";
import SoftwareComplaints from "./views/tiles/SoftwareComplaints.js";
import HardwareComplaints from "./views/tiles/HardwareComplaints.js";
import NetworkComplaints from "./views/tiles/NetworkComplaints.js";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/update-complaint/:id" element={<Navigate to="/admin/update-complaint" replace />} />
      {/* <Route path="/all-complaints" element={<Navigate to="/admin/all-complaints" replace />} /> */}
      <Route path="/all-complaints"  element={<><Navigate to="/admin/all-complaints"/> <AllComplaints /> </>}/>
      <Route path="/resolved-complaints"  element={<><Navigate to="/admin/resolved-complaints"/> <ResolvedComplaints /> </>}/>
      <Route path="/unresolved-complaints"  element={<><Navigate to="/admin/unresolved-complaints"/> <UnResolvedComplaints /> </>}/>
      <Route path="/pending-complaints"  element={<><Navigate to="/admin/pending-complaints"/> <PendingComplaints /> </>}/>
      <Route path="/category/software"  element={<><Navigate to="/admin/category/software"/> <SoftwareComplaints /> </>}/>
      <Route path="/category/hardware"  element={<><Navigate to="/admin/category/hardware"/> <HardwareComplaints /> </>}/>
      <Route path="/category/network"  element={<><Navigate to="/admin/category/network"/> <NetworkComplaints /> </>}/>
    </Routes>
  </BrowserRouter>
);

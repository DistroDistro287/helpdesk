
import Dashboard from "./views/Dashboard"
import Notifications from "./views/Notifications.js";
import Icons from "./views/Icons.js";
import Typography from "./views/Typography.js";
import TableList from "./views/Tables.js";
import Maps from "./views/Map.js";
import UserPage from "./views/User.js";
import UpgradeToPro from "./views/Upgrade.js";
import NewComplaint from "./views/NewComplaint";
import Complaints from "./views/Complaints";
import UpdateComplaint from "./views/UpdateComplaint";
import ComplaintDetails from "./components/ComplaintDetails.js";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/complaint",
    name: "Log Complaint",
    icon: "nc-icon nc-simple-add",
    component: <NewComplaint />,
    layout: "/admin",
  },
  {
    path: "/complaints",
    name: "Complaints",
    icon: "nc-icon nc-bell-55",
    component: <Complaints />,
    layout: "/admin",
  },
  // {
  //   path: "/vcomplaint",
  //   name: "View Complaint",
  //   icon: "nc-icon nc-bell-55",
  //   component: <ComplaintDetails />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/update-complaint",
  //   name: "Update Complaints",
  //   icon: "nc-icon nc-simple-add",
  //   component: <UpdateComplaint />,
  //   layout: "/admin",
  // },
  // // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Maps />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "nc-icon nc-single-02",
  //   component: <UserPage />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;

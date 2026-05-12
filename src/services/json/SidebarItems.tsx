import type { SidebarItem } from "../../typeScript/interface/global.interface";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PaymentIcon from "@mui/icons-material/Payment";
import InventoryIcon from "@mui/icons-material/Inventory";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";


import {
  Dashboard,

} from "@mui/icons-material";

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    path: "dashboard",
    icon: <Dashboard />,
  },
  {
    label: "Members",
    path: "member",
    icon: <PeopleIcon />,
  },
  {
    label: "Trainers",
    path: "trainer",
    icon: <FitnessCenterIcon />,
  },
  {
    label: "Payments",
    path: "payments",
    icon: <PaymentIcon />,
  },
  {
    label: "Plans",
    path: "plans",
    icon: <InventoryIcon />,
  },
  {
    label: "Workouts",
    path: "workout",
    icon: <DirectionsRunIcon />,
  },
  
];
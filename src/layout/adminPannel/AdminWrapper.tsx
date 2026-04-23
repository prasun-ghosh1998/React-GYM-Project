import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const AdminWrapper = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, background: "linear-gradient(45deg, #0A0A0A, #141414)", p:2 }}>
      <Toolbar />
      <Outlet />
      </Box>
    </Box>
  );
};

export default AdminWrapper;

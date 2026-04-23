import { Box, Toolbar } from "@mui/material";
import UserNavbar from "./UserNavbar";
import UserSidebar from "./UserSidebar";
import { Outlet } from "react-router-dom";

const UserWrapper = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <UserSidebar />

      <Box sx={{ flex: 1 }}>
        <UserNavbar />

        <Box sx={{ p: 3, bgcolor: "#0D0D0D", minHeight: "100vh" }}>
       
        <Toolbar />
        <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default UserWrapper;

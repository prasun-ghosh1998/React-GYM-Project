import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAppSelector } from "../../services/helper/redux";
import { logoutUser } from "../../store/slices/auth.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/Logo.png"

const Navbar: React.FC = () => {

   // Get user from Redux
  const { user, loading } = useAppSelector((state: any) => state.auth);

  // Logout handler
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        
        background: "linear-gradient(90deg, #0A0A0A, #141414)",
        borderBottom:"1px solid #262626",
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
<Typography variant="h6" fontWeight="bold" color="#E6FF00">
          FitIn
        </Typography>

        <Typography variant="h6" fontWeight="bold" color="#E6FF00">
          Admin Dashboard
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton sx={{ p: 0 }}>
            <Avatar src={user.image} alt={user.name} />
          </IconButton>

          <Box sx={{ textAlign: "left" }}>
            <Typography variant="body1" fontWeight="500"color="#fff">
              {user.name}
            </Typography>
            <Typography variant="caption" color="#E6FF00">
              {user.email}
            </Typography>
          </Box>

          {user && (
            <IconButton onClick={handleLogout} disabled={loading}>
              <LogoutIcon color="error" />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
    
  );
};

export default Navbar;

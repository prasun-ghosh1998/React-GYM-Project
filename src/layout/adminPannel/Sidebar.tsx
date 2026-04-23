import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { sidebarItems } from "../../services/json/SidebarItems";

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#121212",
          borderRight:"1px solid #262626",
          color: "#fff",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight="bold">
          Admin Panel
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {sidebarItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={`/admin/${item.path}`}
              sx={{
                "&.active": {
                  backgroundColor: "#1f2937",
                  color:"yellow",
                  borderRight: "4px solid yellow",
                },
                "&:hover": {
                  backgroundColor: "#1f2937",
                  color:"yellow"
                },
              }}
            >
              <ListItemIcon sx={{ color: "yellow" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

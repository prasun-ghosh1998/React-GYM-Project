import { Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import logo from "../../assets/images/Logo.png";

const menu = [
  { name: "Dashboard", icon: <DashboardIcon /> },
  { name: "Workout", icon: <FitnessCenterIcon /> },
  { name: "Diet", icon: <RestaurantIcon /> },
  { name: "Profile", icon: <PersonIcon /> },
];

const UserSidebar = () => {
  return (
    <Box
      sx={{
        width: "240px",
        height: "100vh",
        bgcolor: "#111",
        color: "#fff",
        p: 2,
        boxShadow: "4px 0 20px rgba(0,0,0,0.5)",
      }}
    >
      <Link to={"/"}>
        <img src={logo} alt="logo" style={{ maxWidth: "100px" }} />
      </Link>

      {menu.map((item, i) => (
        <Box
          key={i}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 1.5,
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.1)",
            },
            // "&.active": {
            //   background: "linear-gradient(to right, yellow, orange)",
            //   color: "#000",
            // },
          }}
        >
          {item.icon}
          <Typography>{item.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default UserSidebar;

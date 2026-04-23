import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,

  IconButton,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/images/Logo.png";
import { ArrowRight, } from "lucide-react";
import { useAppSelector } from "../services/helper/redux";


const Navbar = () => {
  const { role, token } = useAppSelector((state) => state.auth);
    console.log("role, token in navbar", role, token);
  const navStyle:any = ({ isActive }: any) => ({
    color: isActive ? "black" : "white",
    backgroundColor: isActive ? "#FFD700" : "transparent",
    padding: "8px 18px",
    borderRadius: "30px",
    fontWeight: 500,
  });

  return (
    <AppBar
      position="absolute"
      sx={{
        background: "transparent",
        boxShadow: "none",
        pt: { xs: 2, md: 5 },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box>
            <NavLink to="/">
              <img src={logo} alt="logo" style={{ width: 140 }} />
            </NavLink>
          </Box>

          {/* Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: "50px",
              p: "5px",
              gap: 1,
            }}
          >
            <Button component={NavLink} to="/" style={navStyle}>
              Home
            </Button>
            <Button component={NavLink} to="/about" style={navStyle}>
              About
            </Button>
            <Button component={NavLink} to="/workout" style={navStyle}>
              Workouts
            </Button>
            <Button component={NavLink} to="/trainer" style={navStyle}>
              Trainers
            </Button>
            <Button component={NavLink} to="/testimonials" style={navStyle}>
              Testimonials
            </Button>

          </Box>

          {/* Login Button */}
          {!token ? (
          <Button
           component={NavLink}
            to="/login"
            sx={{
              borderRadius: "50px",
              px: 3,
              py: 1,
              minWidth: "auto",
              display: "flex",
              alignItems: "center",
              gap: 3,
              whiteSpace: "nowrap",
              border: "1px solid yellow",
              color: "yellow",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "yellow",
                color: "black",
              },
              "&:hover .arrowBox": {
                transform: "translateX(8px)",
              },
            }}
          >
            Login / Create Account
            <Box
              className="arrowBox"
              sx={{
                width: "32px",
                height: "32px",
                backgroundColor: "yellow",
                color: "black",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease",
              }}
            >
              <ArrowRight fontSize="small" />
            </Box>
          </Button>): role === "admin" ? (
            <Button
           component={NavLink}
            to="/admin/dashboard"
            sx={{
              borderRadius: "50px",
              px: 3,
              py: 1,
              minWidth: "auto",
              display: "flex",
              alignItems: "center",
              gap: 3,
              whiteSpace: "nowrap",
              border: "1px solid yellow",
              color: "yellow",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "yellow",
                color: "black",
              },
              "&:hover .arrowBox": {
                transform: "translateX(8px)",
              },
            }}
          >
            Admin Dashbaord
            <Box
              className="arrowBox"
              sx={{
                width: "32px",
                height: "32px",
                backgroundColor: "yellow",
                color: "black",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease",
              }}
            >
              <ArrowRight fontSize="small" />
            </Box>
          </Button>
          ):(

              <Button
           component={NavLink}
            to="user"
            sx={{
              borderRadius: "50px",
              px: 3,
              py: 1,
              minWidth: "auto",
              display: "flex",
              alignItems: "center",
              gap: 3,
              whiteSpace: "nowrap",
              border: "1px solid yellow",
              color: "yellow",
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "yellow",
                color: "black",
              },
              "&:hover .arrowBox": {
                transform: "translateX(8px)",
              },
            }}
          >
            Profile
            <Box
              className="arrowBox"
              sx={{
                width: "32px",
                height: "32px",
                backgroundColor: "yellow",
                color: "black",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease",
              }}
            >
              <ArrowRight fontSize="small" />
            </Box>
          </Button>
          )}

          {/* Mobile Menu Icon */}
          <IconButton sx={{ display: { xs: "block", md: "none" } }}>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

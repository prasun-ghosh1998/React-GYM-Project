import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#000000" ,py:"80px"}}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "90px",
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography
              sx={{ fontSize: "35px", fontWeight: "500", color: "white" }}
            >
              ©2025 Fitin.
            </Typography>
            <Typography
              sx={{ fontSize: "28px", fontWeight: "500", color: "white" }}
            >
              All rights reserved.
            </Typography>
            <Box sx={{ mt: "50px",display:"flex",flexDirection:"column",gap:"3px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                  fontWeight: "200",
                }}
              >
                <Link to="" style={{ textDecoration: "none", color: "white" }} >
                  Instagram
                </Link>
                <ArrowRight style={{ color: "white" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                  fontWeight: "200",
                  
                }}
              >
                <Link to="" style={{ textDecoration: "none", color: "white", }} >
                  Facebook
                </Link>
                <ArrowRight style={{ color: "white" }} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "20px",
                  fontWeight: "200",
                }}
              >
                <Link to="" style={{ textDecoration: "none", color: "white" }} className="highlight">
                  Youtube
                </Link>
                <ArrowRight style={{ color: "white" }} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "38%", textAlign: "center" }}>
            <Link
              style={{
                fontSize: "150px",
                fontWeight: "600",
                textDecoration: "none",
                color: "yellow",
              }}
              to="/"
            >
              Fitln.
            </Link>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "white",
                fontSize: "18px",
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "white" }} className="highlight">
                Home
              </Link>{" "}
              |
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "white" }} className="highlight">
                About Us
              </Link>{" "}
              |
              <Link
                to="/workout"
                style={{ textDecoration: "none", color: "white" }} className="highlight">
                Workouts
              </Link>{" "}
              |
              <Link to="/" style={{ textDecoration: "none", color: "white" }} className="highlight">
                Trainers
              </Link>{" "}
              |
              <Link to="/" style={{ textDecoration: "none", color: "white" }} className="highlight">
                Testimonials
              </Link>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ width: "100%", height: "1px", backgroundColor: "white" }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "27px",
          }}
        >
          <Box sx={{ width: "40%" }}>
            <Typography sx={{ color: "white", fontSize: "44px" }}>
              Stay Updated
            </Typography>
            <Typography sx={{ color: "gray" }}>
              Get event info straight to your inbox. Subscribe to receive tips,
              exclusive offers, and updates.
            </Typography>
          </Box>
          <Box sx={{ width: "40%" }}>
            <TextField
              placeholder="Email input"
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "50px",
                  height: "56px",
                  p: 1,
                  py: 4,
                  color: "white",
                  backgroundColor: "#1E1E1E",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
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
                      Subscribe
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
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

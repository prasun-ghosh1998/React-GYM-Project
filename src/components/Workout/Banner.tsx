import { Box, Container, Typography } from "@mui/material";
import workoutBg from "../../assets/images/workout/banner-bg.png";
import yellowFrame from "../../assets/images/yello-frame.png";

const Banner = () => {
  return (
    
    <Box
      sx={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)),
          url(${workoutBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "end",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            justifyItems: "center",
          }}
        >
          
          <Box >
            <Typography
              sx={{
                color: "yellow",
                fontWeight: 800,
                fontSize: { xs: "40px", sm: "70px", md: "110px" },
                lineHeight: 1,
              }}
            >
              WORKOUT
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              maxWidth: "342px",
            }}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}
            >
              HOME
            </Typography>

            <Typography
              sx={{ fontSize: "16px", color: "yellow", fontWeight: 800 }}
            >
              .WORKOUT
            </Typography>
          </Box>

          <Box mt={2}>
            <img src={yellowFrame} alt="frame" style={{ maxWidth: "100%" }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner
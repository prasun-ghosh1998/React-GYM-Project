import { Box, Container, Typography } from "@mui/material";
import bgimage from "../../assets/images/home_banner_img.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import FitnessCard from "./FitnessCard";

const Banner = () => {
  return (
    <Box
      sx={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3)),
          url(${bgimage})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "150vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 3,
          }}
        >
          {/* Left Text */}
          <Box sx={{ maxWidth: 400 }}>
            <Typography
              sx={{
                color: "#fff",
                fontSize: { xs: "16px", md: "20px" },
                lineHeight: 1.6,
                background:
                "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.1))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              }}
            >
              Lorem ipsum dolor sit amet consectetur. Nullam vitae leo sed scelerisque.
            </Typography>
          </Box>

          {/* Right Heading */}
          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 800,
                fontSize: { xs: "40px", sm: "70px", md: "110px" },
                lineHeight: 1,
              }}
            >
              FOCUSFUEL
            </Typography>

            <Typography
              sx={{
                color: "#FFD700",
                fontWeight: 800,
                fontSize: { xs: "40px", sm: "70px", md: "110px" },
              }}
            >
              FITNESS
            </Typography>

            <Box mt={2}>
              <img
                src={yellowFrame}
                alt="frame"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Bottom Cards */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <FitnessCard />
      </Box>
    </Box>
  );
};

export default Banner;
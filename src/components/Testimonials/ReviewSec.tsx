import { Box, Container, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";

import ReviewCard from "./ReviewCard";

const ReviewSec = () => {
  return (
    <Box sx={{ backgroundColor: "#000", py: "80px" }}>
      <Container maxWidth="xl">
        <Box>
          <Typography
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "27px",
              textTransform: "uppercase",
            }}
          >
            <img src={circle} />
            workouts
            <img src={yellowFrame} />
          </Typography>
          <Typography
            sx={{ fontSize: "42px", fontWeight: "400", mt: "50px", mb: "20px" }}
          >
            <span
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,1), rgba(255, 255, 255, 0.19))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              INSPIRING JOURNEYS:
            </span>{" "}
            <span style={{ color: "white" }}>CLIENT</span>{" "}
            <span style={{ color: "yellow" }}>TESTIMONIALS</span>
          </Typography>
        </Box>
        <Box sx={{ width: "100%", py: 5 }}>

          <ReviewCard />
          
        </Box>
      </Container>
    </Box>
  );
};

export default ReviewSec;

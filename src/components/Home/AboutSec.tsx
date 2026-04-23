import { Box, Container, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import AboutSecBg from "../../assets/images/about_sec_bg.png";
import AboutSecImg from "../../assets/images/about_sec_img.png";
import AboutCard from "./AboutCard";


const AboutSec = () => {
  return (
    <Box
      sx={{
        paddingY: "80px",
        backgroundImage:`url(${AboutSecBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Typography
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "27px",
              textTransform:"uppercase"
            }}
          >
            <img src={circle} />
            About Our Gym
            <img src={yellowFrame} />
          </Typography>
          <Typography
            sx={{
              background:
                "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "48px",
              width: "60%",
            }}
          >
            Turn your workout into a lifestyle that moves you forward
          </Typography>
        </Box>
        <Box sx={{display:"flex",justifyContent:"space-between",mt:"80px"}}>
            <Box sx={{width:"40%",height: "auto"}}>
                <img src={AboutSecImg} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </Box>
            <Box sx={{width:"60%"}}>
                <AboutCard/>
            </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutSec;

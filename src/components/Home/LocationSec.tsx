import { Box, Container, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import locationbg from "../../assets/images/location-bg.png";
import worldmap from "../../assets/images/location-world-img.png";

const LocationSec = () => {
  return (
    <Box
      sx={{
        background: `url(${locationbg}) center/cover no-repeat`,
        pt:"80px",
        pb:"120px"
      }}
    >
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
            our locations
            <img src={yellowFrame} />
          </Typography>
          <Box>
            <Typography
              sx={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0.08),rgba(255,255,255,0))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "44px",
                fontWeight: "300",
                mt:"80px",
                mb:"30px"
              }}
            >
              Our global presence:{" "}
              <span style={{ WebkitTextFillColor: "yellow" }}>
                Fitness{" "}
                <span style={{ WebkitTextFillColor: "white" }}>centers</span>{" "}
                around the world
              </span>{" "}
            </Typography>
            <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mb:"80px"}}>
              <Box>
                <Typography sx={{color:"white",fontSize:"81px",fontWeight:"600",lineHeight: 1,}}>25 <span style={{color:"yellow"}}>+</span></Typography>
                <Typography sx={{color:"white",fontSize:"32px",fontWeight:"300"}}>countries</Typography>
              </Box>
              <Typography sx={{color:"white",fontSize:"18px",fontWeight:"300",maxWidth: "85%",
      lineHeight: 1.6,}}>
                Our presence stretches across continents, connecting a worldwide
                community of fitness enthusiasts. From bustling metropolitan
                hubs to growing local neighborhoods, our fitness centers deliver
                the same trusted quality and results-driven training. Each
                location is equipped with expert coaches, modern facilities, and
                a motivating environment tailored to your goals. Whether you are
                traveling, relocating, or joining us for the first time, you’ll
                always find a home for your fitness journey with us. Together,
                we’re building a stronger, healthier world—one city at a time.
              </Typography>
            </Box>
          </Box>
          <Box sx={{maxWidth: "1700px"}}>
            <img src={worldmap} alt="" style={{width:"100%",height:"auto",objectFit:"contain"}} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LocationSec;

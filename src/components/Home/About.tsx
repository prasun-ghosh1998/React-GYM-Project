import { Box, Container, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import aboutImg from "../../assets/images/home_about_img.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import { PhoneCall } from "lucide-react";
const About = () => {
  return (
    <Box sx={{ paddingTop: "160px",paddingBottom:"80px", backgroundColor: "#000000" }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", justifyContent: "space-between",alignItems:"start"}}>
          <Typography
            sx={{
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize:"27px",
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
            Empowering Every Body to Move Stronger, Live Better, and Go Further
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "70px",
            mt: "80px",
          }}
        >
          <Box sx={{  height: "auto", width: "40%" }}>
            <img
              src={aboutImg}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
          <Box sx={{ width: "60%", mb: "30px" }}>
            <Typography sx={{ color: "white",fontSize:"35px" }}>
              We believe fitness is more than just physical. It’s about building
              confidence, discipline, and a lifestyle you can be proud of.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between",gap:"45px" }}>
              <Box>
                <p style={{ color: "white" }}>
                  Founded with the version of creating a spacet for all fitness
                  levels .Our gym offers expert guidence modern equipment and an
                  uplifting atmosphere to help you achieve your goals.
                </p>
                <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center",mt: "30px"}}>
                  <Box sx={{padding:"12px 21px", backgroundColor:'yellow'}}><PhoneCall /></Box>
                  <Box>
                    <Typography sx={{color:"white",fontSize:"23px"}}>CUSTOMER SUPPORT</Typography>
                    <a href="" style={{color:"yellow",fontSize:"30px"}}>(888)4000-2424</a>
                  </Box>
                </Box>
              </Box>
              <p style={{ color: "white" }}>
                Whether you’re a beginner or a seasoned athlete. We’re here to
                support your journey with personalized training, diverseprograms
                and a community that motivates you every step of the way
              </p>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;

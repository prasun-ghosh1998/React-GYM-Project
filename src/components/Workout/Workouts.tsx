import { Box, Container, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import WorkoutsCard from "./WorkoutsCard";

const Workouts = () => {
  return (
    <Box sx={{ backgroundColor: "#000", pt: "80px" }}>
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
          <Typography sx={{color:"white",fontSize:"42px",fontWeight:"400",mt:"60px",mb:"10px"}}>
            Your <span style={{color:"yellow"}}>Fitness</span> <span style={{background:
                "linear-gradient(to right, rgba(255,255,255,1), rgba(255, 255, 255, 0.19))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",}}>Journey Starts Here:</span> Select a <span style={{color:"yellow"}}>Category</span>
          </Typography>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <Box sx={{borderRight:"1px solid white",pr:"50px"}}>
              <Typography sx={{color:"yellow",fontSize:"80px",fontWeight:"600",lineHeight:1}}>50<span style={{color:"white"}}>+</span></Typography>
              <Typography sx={{color:"#dfdadabb",fontSize:"32px",fontWeight:"400"}}>Categories</Typography>
            </Box>
            <Typography sx={{color:"#dfdadabb",maxWidth:"80%",fontSize:"18px",fontWeight:"28px"}}>
              Our training categories are carefully structured to help you push
              limits, track results, and evolve both physically and mentally.
              You can enroll in focused programs like Power Build, CrossFit
              Challenge, or Yoga Flow, and experience results that go beyond the
              gym floor. Every routine, every rep, and every breath brings you
              one step closer to your strongest self. With expert support,
              personalized guidance, and a motivating community, you’ll stay
              consistent and inspired every day. Choose your category, commit to
              your plan, and let’s start building the best version of you.
            </Typography>
          </Box>
          <WorkoutsCard/>
        </Box>
      </Container>
    </Box>
  );
};

export default Workouts;

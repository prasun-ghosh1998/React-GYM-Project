import { Box, Container, Typography } from "@mui/material";
import topfooterBgImg from "../../assets/images/topfooter-bg-img.png";
import topFooterImg from "../../assets/images/topfooter-img.png";
import yellowFrame from "../../assets/images/yello-frame.png";

const TopFooter = () => {
  return (
    <Box sx={{ background: `url(${topfooterBgImg}) center/cover no-repeat`,pb:"80px",pt:"468px"}}>
      <Container maxWidth="xl">
        <Box sx={{position:"relative"}}>
          <Box sx={{ maxWidth: "650px",position:"absolute",bottom:"20px",left:"440px",zIndex:"10" }}>
            <img src={topFooterImg} alt="" style={{width:"100%",height:"auto",objectFit:"contain"}}/>
          </Box>
          <Box sx={{textAlign:"center",position:"relative",zIndex:"12"}}>
            <Typography sx={{color:"white",textTransform:"uppercase",fontSize:"40px",fontWeight:"800"}}>Real Stories. Real People.</Typography>
            <Typography sx={{color:"yellow",textTransform:"uppercase",fontSize:"70px",fontWeight:"800"}}>Real Transformation.</Typography>
            <img src={yellowFrame} alt="" />
            <Typography sx={{ background:
                "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",fontSize:"25px",fontWeight:"300",maxWidth:"700px",mx:"auto"}}>
              Join a community that supports your goals with expert coaching,
              flexible programs and real results.{" "}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TopFooter;

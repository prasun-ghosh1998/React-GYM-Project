import { Box, Container, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import serviceBgImg from"../../assets/images/about/Services-bg.png";



const Services = () => {


  return (
    <Box sx={{background:`linear-gradient(to bottom, rgba(0, 0, 0, 0.51), rgba(0, 0, 0, 0)),
          url(${serviceBgImg})`,backgroundSize: "cover",
        backgroundPosition: "center",}}>
      <Container maxWidth="xl">
        <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",}}>
          <Box >
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
              Service
              <img src={yellowFrame} />
            </Typography>
          </Box>
          <Box sx={{ width: "50%",height:"250px" }}>
            

          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Services;

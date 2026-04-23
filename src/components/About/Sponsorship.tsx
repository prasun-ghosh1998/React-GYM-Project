import { Box, Container, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import logo1 from "../../assets/images/about/spon-img1.png";
import logo2 from "../../assets/images/about/spon-img2.png";
import logo3 from "../../assets/images/about/spon-img3.png";
import logo4 from "../../assets/images/about/spon-img4.png";
import logo5 from "../../assets/images/about/spon-img5.png";
import logo6 from "../../assets/images/about/spon-img6.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

const Sponsorship = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "#000", py: "80px" }}>
        <Container maxWidth="xl">
          <Box>
            <Typography
              sx={{
                color: "yellow",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "27px",
                textTransform: "uppercase",
              }}
            >
              <img src={circle} />
              Sponsorship
              <img src={yellowFrame} />
            </Typography>
          </Box>
          <Box sx={{ overflow: "hidden", position: "relative", mt: "80px" }}>
            <Box
              sx={{
                display: "flex",
                width: "max-content",
                animation: "scroll 20s linear infinite",
              }}
            >
              {[...logos, ...logos].map((logo, i) => (
                <Box
                  component="img"
                  src={logo}
                  key={i}
                  sx={{
                    maxWidth: 170,
                    mx: 5,
                    filter: "grayscale(100%)",
                    opacity: 0.7,
                    transition: "0.3s",
                    "&:hover": {
                      filter: "grayscale(0%)",
                      opacity: 1,
                      transform: "scale(1.1)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Sponsorship;

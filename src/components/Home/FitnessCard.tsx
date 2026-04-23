import { Box, Card, CardContent, Typography } from "@mui/material";
import img1 from "../../assets/images/IMG1.png";
import img2 from "../../assets/images/IMG2.png";
import img3 from "../../assets/images/IMG3.png";
import yellowFrame from "../../assets/images/yello-frame.png";

const services = [
  {
    id: "01",
    title: "PERSONAL TRAINING",
    image: img1,
  },
  {
    id: "02",
    title: "GROUP WORKOUT",
    image: img2,
  },
  {
    id: "03",
    title: "MUSCLE BUILDING",
    image: img3,
  },
];

const FitnessCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems:"center",
        
      }}
    >
      {services.map((item) => (
        <Box
          key={item.id}
          sx={{
            border: "1px solid rgba(255,255,255,0.3)",
            width: "35%",
            
          }}
        >
          <Card
            sx={{
              background: "#1E1E1E",
              margin: "25px",
            }}
          >
            <CardContent sx={{ padding: "30px" }}>
              <img src={yellowFrame} />
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "white",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: "120px",
                  fontWeight: "900",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                  lineHeight: 1,
                }}
              >
                {item.id}
              </Typography>
              
            </CardContent>
          </Card>
          <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{
                  maxWidth: "80%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  bottom: "25px",
                  right: "25px",
                  zIndex: 10,
                }}
              />
        </Box>
      ))}
    </Box>
  );
};

export default FitnessCard;

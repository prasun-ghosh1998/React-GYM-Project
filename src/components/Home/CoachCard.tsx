import { Box, Typography } from "@mui/material";
import coach1 from "../../assets/images/coach-img1.png";
import coach2 from "../../assets/images/coach-img2.png";
import coach3 from "../../assets/images/coach-img3.png";
import coachCardBg from "../../assets/images/card-frame.png";
import yellowFrame from "../../assets/images/yello-frame.png";

const cardDetails = [
  {
    title: "fitness coach",
    name: "Ethan Cross",
    img: coach1,
  },
  {
    title: "fitness coach",
    name: "Trent Morgan",
    img: coach2,
  },
  {
    title: "fitness coach",
    name: "Damian Brooks",
    img: coach3 ,
  },
];
const CoachCard = () => {
  return (

   <Box sx={{display:"flex",alignItems:'center',justifyContent:"space-between"}}>

    {cardDetails.map((coach, i) => (

        <Box key={i}
          sx={{
            width:"33.33%",
            height: "380px", 
            // overflow: "hidden",
            position: "relative",
            color: "white",
            p:"24px",
            border:"1px solid rgba(255,255,255,0.3)",
          }}
        >
          
          <Box
            sx={{
              height: "100%",
              backgroundImage: `
                linear-gradient(rgba(30,30,30,0.85), rgba(30,30,30,0.85)),
                url(${coachCardBg})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end", 
            }}
          >
            <img src={yellowFrame} alt="" style={{ width: "38px" }} />

            <Typography sx={{ fontSize: "14px", opacity: 0.7 }}>
              {coach.title}
            </Typography>

            <Typography sx={{ fontSize: "20px", fontWeight: "700" }}>
              {coach.name}
            </Typography>
          </Box>
          <Box
            component="img"
            src={coach.img}
            alt={coach.name}
            sx={{
              position: "absolute",
              bottom: 50,
              right: 30, 
              height: "94%",
              maxWidth:'440px',
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
        </Box>
    ))}
</Box>
  );
};

export default CoachCard;

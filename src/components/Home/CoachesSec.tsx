import { Box, Container, Typography } from '@mui/material'
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import CoachCard from './CoachCard';


const CoachesSec = () => {
  return (
    <Box
      sx={{
        paddingY: "80px",
        background: "#000000",
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
            meet your coaches
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
        </Container>
        <Box sx={{pt:"50px"}}>
           <CoachCard/>
        </Box>
        </Box>
  )
}

export default CoachesSec
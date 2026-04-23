import { Box, Container, Typography } from '@mui/material'
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";


const HowItWork = () => {
  return (
    <>
    <Box sx={{backgroundColor:"#000"}}>
        <Container maxWidth="xl">
            <Box sx={{display:"flex"}}>
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
                get in touch
                <img src={yellowFrame} />
              </Typography>
              <Typography sx={{color:"white"}}>Real Stories. Real  people. Real Transformations.</Typography>
              <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
                <Box sx={{border:"1px solid rgba(255,255,255,0.25)"}}>

                </Box>
                <Box></Box>
                <Box></Box>
              </Box>
            </Box>
        </Container>
    </Box>
    </>
  )
}

export default HowItWork
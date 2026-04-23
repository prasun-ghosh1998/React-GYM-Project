import { Box, Button, Container, TextField, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import { CircleCheck } from "lucide-react";

const GetInTouch = () => {
  return (
    <>
      <Box sx={{ backgroundColor: "yellow", position: "relative" }}>
        <Container maxWidth="xl">
          <Box sx={{display:'flex'}}>
            <Box
              sx={{
                maxWidth: "703px",
                height: "671px",
                border: "1px solid yellow",
                background:
                  "linear-gradient(to top, rgba(30,30,30,0), rgba(30,30,30,1))",backdropFilter: "blur(10px)",
                p: "36px",
                boxShadow: "-66px 80px 229px rgba(0,0,0,0.59)",
              }}
            >
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
              <Typography sx={{mt:"50px",mb:"30px",fontSize:"18px",fontWeight:"700",color:"white"}}>Ready to Transform Your Body?</Typography>
              <Typography sx={{fontSize:"16px",fontWeight:"400",color:"#f5f1f1bb",lineHeight:"28px"}}>
                Start your fitness journey today with expert-led programs built
                for real results — from strength to wellness.
              </Typography>
              <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",mb:"5px",mt:"24px"}}>
                <Typography sx={{display:"flex",alignItems:"center",gap:"8px",fontSize:"18px",fontWeight:"400",color:"#fff",lineHeight:"28px"}}>
                  <CircleCheck style={{color:"yellow"}}/>
                  Complimentary gym kit
                </Typography>
                <Typography sx={{display:"flex",alignItems:"center",gap:"8px",fontSize:"18px",fontWeight:"400",color:"#fff",lineHeight:"28px"}}>
                  <CircleCheck style={{color:"yellow"}}/>
                  Free session with certified trainer
                </Typography>
              </Box>

              <Typography sx={{ textAlign: "center",fontSize:"105px",fontWeight:"600",color:"#fff" }}>
                <span style={{fontSize:"18px",fontWeight:"400",color:"yellow"}}>RS</span>19,999
              </Typography>
              <Typography sx={{mt:"36px",mb:"50px", textAlign: "center",fontSize:"18px",fontWeight:"600",color:"yellow",letterSpacing: "6px" }}>
                OFF YOUR MEMBERSHIP PLANE.
              </Typography>
              <Button
                fullWidth
                sx={{
                  mb:"12px",
                  color: "black",
                  backgroundColor: "yellow",
                  borderLeft: "4px solid black",
                  borderRight: "4px solid black",
                }}
              >
                ENROLL NOW
              </Button>
              <Typography sx={{fontSize:"15px",fontWeight:"400",color:"#dddadacb",}}>
                T&C: Offer valid for new enrollments only. Cannot be combined
                with other discounts. Limited-time promotion subject to
                availability.
              </Typography>
            </Box>
            <Box>
              <Box
  sx={{
    display: "flex",
    gap: 3,
    width: "100%",
    flexWrap: "wrap", // makes it responsive
  }}
>
  {/* FULL NAME */}
  <Box sx={{ flex: 1, minWidth: "250px" }}>
    <Typography
      sx={{
        color: "#000",
        fontSize: "12px",
        mb: 1,
        letterSpacing: "1px",
      }}
    >
      YOUR FULL NAME
    </Typography>

    <TextField
      fullWidth
      variant="filled"
      InputProps={{
        disableUnderline: true,
      }}
      sx={{
        backgroundColor: "#ffffff",
      }}
    />
  </Box>

  {/* EMAIL */}
  <Box sx={{ flex: 1, minWidth: "250px" }}>
    <Typography
      sx={{
        color: "#000",
        fontSize: "12px",
        mb: 1,
        letterSpacing: "1px",
      }}
    >
      EMAIL ADDRESS
    </Typography>

    <TextField
      fullWidth
      variant="filled"
      
      InputProps={{
        disableUnderline: true,
      }}
      sx={{
        backgroundColor: "#ffffff",
      }}
    />
  </Box>
</Box>
              <Box>
              <Typography>MESSAGE</Typography>
              <TextField></TextField>
              </Box>
              <Button sx={{px:"50px",py:"20",borderLeft:"4px solid black",borderRight:"4px solid black"}}>GET STARTED TODAY</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default GetInTouch;

import { Box, Container, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import { CircleCheck, PhoneCall } from "lucide-react";
import WhoWeAreImg from "../../assets/images/about/Who-we-are-img.png";


const WhoWeAre = () => {

    const details=[
        "Himenaeos pellentesque",
        "Elementum ridiculus",
        "Rutrum convallis",
        "Pellentesque maecenas",
        "Cubilia tincidunt" 
    ]
 
  return (
    <Box
      sx={{
        paddingTop: "120px",
        pb:"80px",
        backgroundColor: "#000",
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
              textTransform: "uppercase",
            }}
          >
            <img src={circle} />
            Who We Are
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
            alignItems: "center",
            justifyContent: "space-between",
            mt: "80px",
          }}
        >
          <Box sx={{ width: "55%" }}>
            <Typography
              sx={{ color: "white", fontSize: "35px", fontWeight: "400",mb:"62px" }}
            >
              Nunc vivamus quisque laoreet a porta risus volutpat sit nibh
              sociosqu cubilia. At adipiscing auctor ultricies velit libero
              ligula imperdiet sodales tellus aliquam urna.
            </Typography>
            <Box sx={{display:"flex" ,alignItems:"center",justifyContent:"space-between"}}>
                <Box sx={{ color: "white" }}>
                {details.map((i)=>(
              <Typography sx={{color:"#ffffffa8",display:"flex",alignItems:"center",gap:"8px",fontSize:"20px",lineHeight:"2"}}><CircleCheck color="#fad900" strokeWidth={1.75} />{i}</Typography>
                ))}
              
            </Box>
            <Box sx={{ color: "white" }}>
                {details.map((i)=>(
              <Typography sx={{color:"#ffffffa8",display:"flex",alignItems:"center",gap:"8px",fontSize:"20px",lineHeight:"2"}}><CircleCheck color="#fad900" strokeWidth={1.75} />{i}</Typography>
                ))}
              
            </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap:"18px",
                alignItems: "center",
                mt: "62px",
              }}
            >
              <Box sx={{ padding: "10px 18px", backgroundColor: "yellow" }}>
                <PhoneCall />
              </Box>
              <Box>
                <Typography sx={{ color:"#ffffffd0", fontSize: "23px",fontWeight:"400" }}>
                  CUSTOMER SUPPORT
                </Typography>
                <a href="" style={{ color: "yellow", fontSize: "30px",textDecoration:"none" }}>
                  (888)4000-2424
                </a>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "40%", position: "relative" }}>
            <img
              src={WhoWeAreImg}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: "50%",
                background:
                  "linear-gradient(to bottom, rgba(255, 255, 255, 0.01), rgba(0, 0, 0, 0.97))",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WhoWeAre;

import { Box, Button, Container, Typography } from "@mui/material";
import circle from "../../assets/images/Ellipse.png";
import yellowFrame from "../../assets/images/yello-frame.png";
import planCard from "../../assets/images/plan-card-bg.png";
import { CircleCheck, IndianRupee } from "lucide-react";
import { planList } from "../../store/slices/plan.slice";
import { useAppDispatch, useAppSelector } from "../../services/helper/redux";
import { useEffect } from "react";



const PlanSec = () => {
  const dispatch = useAppDispatch();
    const { list, loading } = useAppSelector((state) => state.plan);
  
    useEffect(() => {
      dispatch(planList({ params: { page: 1, limit: 10 } }));
    }, [dispatch]);
  
    const publishedplans = list?.filter(
      (item: any) => item.status === "publish"
    );
  
    if (loading) return <Typography>Loading...</Typography>;
  return (
    <Box sx={{ backgroundColor: "#000000", py: "80px" }}>
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
            Choose Your Plan
            <img src={yellowFrame} />
          </Typography>
          <Typography
            sx={{
              background:
                "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: "45px",
              fontWeight: "300",
              maxWidth: "53%",
            }}
          >
            Flexible plans tailored to your goals—start your fitness journey
            today.
          </Typography>
        </Box>
      </Container>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {publishedplans.map((plan:any) => (
          <Box
            key={plan.$id}
            sx={{ border: "1px solid rgba(255,255,255,0.2)",width:"33.33%",p: "25px", }}
          >
            <Box
              sx={{
                backgroundImage: `url(${planCard})`,
                backgroundColor: "#1E1E1E",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                p: "25px",
                
              }}
            >
              <img src={yellowFrame} alt="" style={{width:"38px"}} />
              <Typography sx={{fontSize:"20px",fontWeight:"700",color:"white"}}>{plan.title}</Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "300",color:"rgba(255, 255, 255, 0.4)" }}>
                {plan.desc}
              </Typography>
              
              <Typography sx={{display:"flex",alignItems:"start", mt: "100px", mb: "30px",fontSize:"53px",fontWeight:"700",color:"white" }}>
                <IndianRupee style={{fontSize:"55px", color:"white"}} />{plan.price} <span style={{fontSize:"22px",fontWeight:"400",}}>/month</span>
              </Typography>
              <Box sx={{ mb:"100px",color:"rgba(255, 255, 255, 0.4)", }}>
                {plan.planFeture?.split(",").map((fet:string, ind:number) => (
                  <Typography
                    key={ind}
                    sx={{ display: "flex", alignItems: "center",gap:"12px",fontSize:"18px",fontWeight:"400" }}
                  >
                    <CircleCheck />
                    {fet}
                  </Typography>
                ))}
              </Box>
              <Button
                fullWidth
                sx={{
                  textTransform: "uppercase",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "500",
                  border:"1px solid rgba(255,255,255,0.3)",
                  borderLeftColor:"yellow",
                  borderRightColor:"yellow",
                  transition: "0.4s",
                  "&:hover":{
                    backgroundColor:"yellow",
                    color:"#000",
                    transform: "scale(1.05)",
                  }
                }}
              >
                get membership
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PlanSec;

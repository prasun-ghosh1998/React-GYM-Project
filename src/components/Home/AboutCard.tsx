import { Box, Card, CardContent, Typography } from "@mui/material";
import { Check } from "lucide-react";

const Details = [
  {
    id: "01",
    title: "Certified & Experience Coachees",
    para: "Lorem ipsum dolor sit amet consectetur. Donec justo volutpat dictumst suspendisse sed sed at libero. Sed congue diam nisl lobortis diam ut.",
  },
  {
    id: "02",
    title: "Certified & Experience Coachees",
    para: "Lorem ipsum dolor sit amet consectetur. Donec justo volutpat dictumst suspendisse sed sed at libero. Sed congue diam nisl lobortis diam ut.",
  },
  {
    id: "03",
    title: "Certified & Experience Coachees",
    para: "Lorem ipsum dolor sit amet consectetur. Donec justo volutpat dictumst suspendisse sed sed at libero. Sed congue diam nisl lobortis diam ut.",
  },
  {
    id: "04",
    title: "Certified & Experience Coachees",
    para: "Lorem ipsum dolor sit amet consectetur. Donec justo volutpat dictumst suspendisse sed sed at libero. Sed congue diam nisl lobortis diam ut.",
  },
  {
    id: "05",
    title: "Certified & Experience Coachees",
    para: "Lorem ipsum dolor sit amet consectetur. Donec justo volutpat dictumst suspendisse sed sed at libero. Sed congue diam nisl lobortis diam ut.",
  },
  {
    id: "06",
    title: "Certified & Experience Coachees",
    para: "Lorem ipsum dolor sit amet consectetur. Donec justo volutpat dictumst suspendisse sed sed at libero. Sed congue diam nisl lobortis diam ut.",
  },
];
const AboutCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "24px",
        alignItems: "center",
      }}
    >
      {Details.map((item) => (
        <Box
          key={item.id}
          sx={{
            width: "48%",
            transition: "0.3s",
            "&:hover": {
              border: "1px solid rgba(242,255,0,1)",
              transform: "scale(1.05)",
              cursor: "pointer",
            },
          }}
        >
          <Card
            sx={{
              background: "rgba(255,255,255,0.1)",
            }}
          >
            <CardContent sx={{ padding: "30px" }}>
              <Check style={{ color: "yellow" }} />
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "white",
                  fontSize: "23px",
                  fontWeight: "bold",
                }}
              >
                {item.title}
              </Typography>
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "normal",
                }}
              >
                {item.para}
              </p>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default AboutCard;

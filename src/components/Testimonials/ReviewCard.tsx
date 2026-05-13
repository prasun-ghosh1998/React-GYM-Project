import { Card, CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const cards = [
  {
    id: 1,
    name: "Cameron Williamson",
    desc: "The fitness commucommunity is amaamazing . I have seen real improvement is my strength and overall fitness.",
  },
  {
    id: 2,
    name: "Savannah Alexjender",
    desc: "I was new to fitness,but they made me feel right at home.I love how every class is both challenging and fun.",
  },
  {
    id: 3,
    name: "Cameron Greenlewis",
    desc: "The trainers are knowledge and supportive. I have seen real improvements in my strengh and overall fitness.",
  },
  {
    id: 4,
    name: "Darlenes Robertson",
    desc: "The trainers are knowledge and supportive. I have seen real improvements in my strengh and overall fitness.",
  },
];

const ReviewCard = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{
          delay: 2000, // 2 seconds
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        style={{ height: "400px", maxWidth: "" }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <Card
              sx={{
                height: "70%",
                background: "#111",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  borderColor: "yellow",
                },
              }}
            >
              <CardContent
                sx={{ height: "100%", bgcolor: "black", textAlign: "center" }}
              >
                <Typography variant="h5" color="yellow">
                  {card.name}
                </Typography>
                <Typography variant="body2" color="white">
                  {card.desc}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ReviewCard;

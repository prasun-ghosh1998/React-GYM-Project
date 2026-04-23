import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import yellowFrame from "../../assets/images/yello-frame.png";
import workoutCardBg from "../../assets/images/about/workout-card-bg.png";
// import Card1 from "../../assets/images/about/card1.png";
// import Card2 from "../../assets/images/about/card2.png";
// import Card3 from "../../assets/images/about/card3.png";
// import Card4 from "../../assets/images/workout/card4.png";
import { useAppDispatch, useAppSelector } from "../../services/helper/redux";
import { useEffect } from "react";
import { workoutList } from "../../store/slices/workout.slice";

// const services = [
//   {
//     id: "01",
//     title: "Power Build Program",
//     desc: "Focus on muscle growth and compound lifts.",
//     tag: "Strength",
//     name: "by Ethan Cross",
//     img: Card1,
//   },
//   {
//     id: "02",
//     title: "Yoga Flow",
//     desc: "Improve flexibility and mindfulness.",
//     tag: "Wellness",
//     name: "by trent morgan",
//     img: Card2,
//   },
//   {
//     id: "03",
//     title: "Cardio Blast",
//     desc: "Treadmill, cycling, and jump rope sessions.",
//     tag: "Cardio",
//     name: "by marcus cole",
//     img: Card3,
//   },
//   {
//     id: "04",
//     title: "BoxFit Training",
//     desc: "Boxing drills for strength and agility.",
//     tag: "Combat",
//     name: "by Damian Brooks",
//     img: Card4,
//   },
// ];

const WorkoutsCard = () => {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((state) => state.workout);

  useEffect(() => {
    dispatch(workoutList({ params: { page: 1, limit: 10 } }));
  }, [dispatch]);

  const publishedWorkouts = list?.filter(
    (item: any) => item.status === "publish",
  );

  if (loading) return <Typography>Loading...</Typography>;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          rowGap: "130px",
          columnGap: "12px",
          alignItems: "center",
          mt: "130px",
        }}
      >
        {publishedWorkouts?.map((item: any, index: number) => (
          <Box
            key={item.id}
            sx={{
              border: "1px solid rgba(255,255,255,0.3)",
              width: "49%",
            }}
          >
            <Card sx={{ overflow: "visible", position: "relative" }}>
              <CardContent sx={{ backgroundColor: "#000000" }}>
                <Box
                  component="img"
                  src={item.img}
                  sx={{
                    position: "absolute",
                    top: -110,
                    left: 100,
                    zIndex: "5",
                    height: "100%",
                    maxWidth: "405px",
                    objectFit: "contain",
                    maskImage:
                      "linear-gradient(to bottom, black 60%, transparent 94%)",
                  }}
                />

                <Box
                  sx={{
                    background: `url(${workoutCardBg}) center/cover no-repeat`,
                    padding: "24px",
                    height: "320px",
                    display: "flex",
                    justifyContent: "flex-end",
                    zIndex: "4",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "bold",
                        backgroundColor: "yellow",
                        px: "2px",
                        py: "3px",
                        textAlign: "center",
                      }}
                    >
                      {item.tag}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                      }}
                    >
                      <img
                        style={{ width: "38px", height: "13px" }}
                        src={yellowFrame}
                      />
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "600",
                        backgroundColor: "yellow",
                        py: "4px",
                        width: "39px",
                        px: "10px",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </Typography>
                    <Typography
                      sx={{
                        color: "white",
                        fontSize: "25px",
                        fontWeight: "500",
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#bebcbca2",
                        fontSize: "15px",
                        fontWeight: "400",
                      }}
                    >
                      {item.desc}
                    </Typography>
                  </Box>
                  <Button
                    sx={{
                      backgroundColor: "yellow",
                      color: "black",
                      py: 2,
                      px: 10,
                    }}
                  >
                    Enroll Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default WorkoutsCard;

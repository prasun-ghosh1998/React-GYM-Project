import { Box, Typography, Avatar, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { LogOutIcon } from "lucide-react";

const UserNavbar = () => {
  const user = {
    name: " ",
    email: " ",
    image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        bgcolor: "#0D0D0D",
        color: "#fff",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Box sx={{ textAlign: "left" }}>
        <Typography variant="body1" fontWeight="500">
          {user.name}
        </Typography>
        <Typography variant="caption">{user.email}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton sx={{ color: "#fff" }}>
          <NotificationsIcon />
        </IconButton>

        <Box display="flex" alignItems="center" gap={1}>
          <IconButton sx={{ p: 0 }}>
            <Avatar src={user.image} alt={user.name} />
          </IconButton>

          <LogOutIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default UserNavbar;

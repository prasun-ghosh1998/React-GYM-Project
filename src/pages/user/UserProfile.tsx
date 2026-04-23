import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  CircularProgress,
  Button,
} from "@mui/material";

import {
  account,
  databases,
  storage,
  DATABASE_ID,
  COLLECTION_ID,
  BUCKET_ID,
  tables_ID,
  
} from "../../appwrite/appwriteConfig";

import { Query, ID } from "appwrite";
import { LineChart } from "@mui/x-charts";

const UserProfile = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  const getUserData = async () => {
    try {
      setLoading(true);

      const loggedInUser = await account.get();
      setUser(loggedInUser);

      // ✅ Profile
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", loggedInUser.$id)]
      );

      if (res.documents.length > 0) {
        setProfile(res.documents[0]);
      } else {
        setProfile(null);
      }

      // ✅ Payments
      const payRes = await databases.listDocuments(
        DATABASE_ID,
        tables_ID.PAYMENTS,
        [Query.equal("userId", loggedInUser.$id)]
      );

      setPayments(payRes.documents);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // 🔥 IMAGE UPLOAD
  const uploadImage = async (file: File) => {
    try {
      const upload = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        file
      );

      const imageUrl = storage
        .getFilePreview(BUCKET_ID, upload.$id)
        .toString();

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        profile.$id,
        {
          imageUrl,
          imageId: upload.$id,
        }
      );

      getUserData(); // refresh

    } catch (err) {
      console.log(err);
    }
  };

  // 🔄 LOADING
  if (loading) {
    return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#0f172a">
        <CircularProgress sx={{ color: "#6366f1" }} />
      </Box>
    );
  }

  // ❌ NO PROFILE
  if (!profile) {
    return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#0f172a">
        <Typography color="white">No Profile Found</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} bgcolor="#0f172a" minHeight="100vh">

      {/* 🔥 PROFILE HEADER */}
      <Card sx={{ bgcolor: "#1e293b", color: "#fff", p: 3 }}>
        <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
          
          <Avatar
            src={profile.imageUrl || ""}
            sx={{ width: 120, height: 120 }}
          />

          <Box>
            <Typography variant="h4">
              {profile.firstname} {profile.lastname}
            </Typography>
            <Typography color="gray">{user?.email}</Typography>
            <Typography mt={1}>🎯 {profile.goal}</Typography>

            {/* Upload */}
            <Button component="label" variant="contained" sx={{ mt: 2 }}>
              Upload Image
              <input
                type="file"
                hidden
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    uploadImage(e.target.files[0]);
                  }
                }}
              />
            </Button>
          </Box>
        </Box>
      </Card>

      {/* 🔥 INFO CARDS */}
      <Box mt={3} display="flex" gap={3} flexWrap="wrap">

        <Card sx={{ flex: "1 1 300px", bgcolor: "#1e293b", color: "#fff" }}>
          <CardContent>
            <Typography variant="h6">👤 Personal</Typography>
            <Typography>📞 {profile.phone}</Typography>
            <Typography>🎂 Age: {profile.age}</Typography>
            <Typography>⚖️ Weight: {profile.weight}</Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 300px", bgcolor: "#1e293b", color: "#fff" }}>
          <CardContent>
            <Typography variant="h6">💳 Membership</Typography>
            <Typography>Plan: {profile.plan}</Typography>
            <Typography>Expiry: {profile.expiry}</Typography>

            <LinearProgress
              variant="determinate"
              value={profile.progress || 40}
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>

        <Card sx={{ flex: "1 1 300px", bgcolor: "#1e293b", color: "#fff" }}>
          <CardContent>
            <Typography variant="h6">📊 Stats</Typography>
            <Typography>🏋️ {profile.workouts}</Typography>
            <Typography>🔥 {profile.calories}</Typography>
            <Typography>⏱️ {profile.hours}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* 🔥 WEIGHT GRAPH */}
      <Card sx={{ bgcolor: "#1e293b", color: "#fff", mt: 3 }}>
        <CardContent>
          <Typography variant="h6">📊 Weight Progress</Typography>

          <LineChart
            xAxis={[{ scaleType: "point", data: ["W1", "W2", "W3", "W4"] }]}
            series={[
              {
                data: profile.weightHistory || [70, 72, 74, 73],
              },
            ]}
            height={250}
          />
        </CardContent>
      </Card>

      {/* 🔥 PAYMENTS */}
      <Card sx={{ bgcolor: "#1e293b", color: "#fff", mt: 3 }}>
        <CardContent>
          <Typography variant="h6">💰 Payment History</Typography>

          {payments.length > 0 ? (
            payments.map((p) => (
              <Box key={p.$id} display="flex" justifyContent="space-between" mt={1}>
                <Typography>₹{p.amount}</Typography>
                <Typography>{p.plan}</Typography>
                <Typography>{p.date}</Typography>
              </Box>
            ))
          ) : (
            <Typography color="gray">No payments</Typography>
          )}
        </CardContent>
      </Card>

    </Box>
  );
};

export default UserProfile;
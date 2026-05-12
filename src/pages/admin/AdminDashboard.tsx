
import { useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  People,
  AttachMoney,
  FitnessCenter,
  TrendingUp,
} from "@mui/icons-material";

import { LineChart } from "@mui/x-charts";
import { databases, DATABASE_ID } from "../../appwrite/appwriteConfig";
import { tables_ID } from "../../appwrite/appwriteConfig";

// ✅ Stat Card
const StatCard = ({ title, value, icon }: any) => (
  <Paper
    sx={{
      flex: "1 1 220px",
      p: 3,
      borderRadius: 3,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#1e293b",
      color: "#fff",
    }}
  >
    <Box>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="h5" fontWeight="bold">
        {value}
      </Typography>
    </Box>
    {icon}
  </Paper>
);

const AdminDashboard = () => {
  const [members, setMembers] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]);
  const [months, setMonths] = useState<string[]>([]);

  useEffect(() => {
    fetchDashboard();
  }, []);


  const fetchDashboard = async () => {
    try {
      // 👥 Members Count
      const memberRes = await databases.listDocuments(
        DATABASE_ID,
        tables_ID.MEMBERS
      );

      setMembers(memberRes.total);

      // 💰 Payments
      const paymentRes = await databases.listDocuments(
        DATABASE_ID,
        tables_ID.PAYMENTS
      );

      // Total Revenue
      const totalRevenue = paymentRes.documents.reduce(
        (sum: number, item: any) => sum + (item.amount || 0),
        0
      );

      setRevenue(totalRevenue);

      // 📊 Monthly Revenue
      const monthlyMap: any = {};

      paymentRes.documents.forEach((item: any) => {
        const date = new Date(item.$createdAt);
        const month = date.toLocaleString("default", { month: "short" });

        if (!monthlyMap[month]) {
          monthlyMap[month] = 0;
        }

        monthlyMap[month] += item.amount || 0;
      });

      const monthKeys = Object.keys(monthlyMap);
      const monthValues = Object.values(monthlyMap);

      setMonths(monthKeys);
      setMonthlyRevenue(monthValues as number[]);
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      
      {/* 🔥 Stats */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <StatCard title="Total Members" value={members} icon={<People />} />
        <StatCard title="Revenue" value={`₹${revenue}`} icon={<AttachMoney />} />
        <StatCard title="Active Plans" value="--" icon={<FitnessCenter />} />
        <StatCard title="Growth" value="--" icon={<TrendingUp />} />
      </Box>

      {/* 📊 Chart */}
      <Box sx={{ mt: 3 }}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 3,
            background: "#1e293b",
            color: "#fff",
          }}
        >
          <Typography mb={2}>Monthly Revenue</Typography>

          <LineChart
            height={300}
            series={[{ data: monthlyRevenue, label: "Revenue" }]}
            xAxis={[{ scaleType: "point", data: months }]}
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
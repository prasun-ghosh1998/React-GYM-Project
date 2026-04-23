import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/user/Home";
import About from "../pages/user/About";
import Workout from "../pages/user/Workout";
import UserLayout from "../components/userLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoutes from "./ProtectRoutes";
import AdminWrapper from "../layout/adminPannel/AdminWrapper";
import Trainers from "../pages/user/Trainers";
import Testimonials from "../pages/user/Testimonials";
import PaymentsManagements from "../pages/admin/PaymentsManagements";
import Plans from "../pages/admin/Plans";
import WorkoutManagement from "../pages/admin/WorkoutManagement";
import Member from "../pages/admin/Member";
import TrainersManagement from "../pages/admin/TrainersManagement";
import AdminDashboard from "../pages/admin/AdminDashboard";
import UserProfile from "../pages/user/UserProfile";


const Routes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "workout",
        element: <Workout />,
      },
      {
        path: "trainer",
        element: <Trainers />,
      },
      {
        path: "testimonials",
        element: <Testimonials />,
      },
  
    ],
  },

  {
    path: "/admin",
    element: <ProtectedRoutes/>,
    children: [
      {
        path: "",
        element: <AdminWrapper />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "member",
            element: <Member />,
          },
          {
            path: "trainer",
            element: <TrainersManagement />, 
          },
          {
            path: "payments",
            element: <PaymentsManagements />,
          },
            {
            path: "plans",
            element: <Plans />,
          },
           {
            path: "workout",
            element: <WorkoutManagement />,
          },
        ],
      },
    ],
  },
{
        path: "/user",
        element: <UserProfile />,
      },

]);

export default Routes;

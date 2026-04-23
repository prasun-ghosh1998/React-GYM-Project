import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {

  const { role, token } = useSelector((state: any) => state.auth);
  console.log("role, token in protected routes", role, token);

  return role === "admin" ?  <Outlet/> : <Navigate to="/login"/>

  // if (!admin) {
  //   return <Navigate to="/admin/login" />;
  // }

  // return children;
};

export default ProtectedRoutes;
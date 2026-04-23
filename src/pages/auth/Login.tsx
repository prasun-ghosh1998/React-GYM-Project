import { Box, Button, Container, Typography } from "@mui/material";
import loginImg from "../../assets/images/login_img.png";
import logo from "../../assets/images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import type { LoginData } from "../../typeScript/type/auth.type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../services/validations/auth.validation";
import DynamicInput from "../../components/DyanamicInputs";
import { LoginInputField } from "../../services/json/inputsData/login.input";
import yellowFrame from "../../assets/images/yello-frame.png";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { loginUser } from "../../store/slices/auth.slice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
          const response = await dispatch(loginUser(data)).unwrap();
          console.log("login page----",response)
          if(response){
            toast.success(response.message);

            if(response.user.role === "admin"){
              navigate("/admin/dashboard");
              reset();
            }else{
              navigate("/");
              reset();
            }
          }
          
        } catch (error) {
          console.log(error)
          
        }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center",justifyContent:"center", backgroundColor: "black", height: "100vh" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "linear-gradient(201deg, #d7d70c, #000000)",
            maxWidth:"800",
            borderRadius: "15px",
          }}
        >
          <Box sx={{ marginTop: "60px", marginX: "60px", color: "white" }}>
            <img src={yellowFrame} alt="" />
            <Typography sx={{ fontSize: "27px" }}>LOGIN YOUR ACCOUNT</Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: "60px" }}
            >
              {LoginInputField?.map((input) => (
                <DynamicInput
                  key={input.name}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  required={input.required}
                  register={register}
                  errors={errors}
                />
              ))}

              
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  mt: 2,
                  py: 1.3,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  color: "black",
                  backgroundColor: "yellow",
                }}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
              <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    fontWeight: 300,
                    fontSize: "1rem",
                    color:"rgba(255,255,255,0.3)"
                  }}
                >
                  Create account?{" "}
                  <Link
                    to="/register"
                    style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  >
                    Register
                  </Link>
                </Typography>
            </Box>
          </Box>

          <Box sx={{ position: "relative" }}>
            <img src={loginImg} style={{ margin: "10px" }} />
            <img
              src={logo}
              style={{ position: "absolute", right: "50px", top: "50px" }}
            />
          </Box>
        </Box>
        
      </Container>
    </Box>
  );
};

export default Login;
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Card, Container, Box, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DynamicInput from "../../components/DyanamicInputs";
import { RegisterInputField } from "../../services/json/inputsData/register.input";
import type { RegisterData } from "../../typeScript/type/auth.type";
import { useAppDispatch, useAppSelector } from "../../services/helper/redux";
import { registerUser } from "../../store/slices/auth.slice";
import { toast } from "sonner";
import yellowFrame from "../../assets/images/yello-frame.png";
import loginImg from "../../assets/images/login_img.png"
import { registerSchema } from "../../services/validations/auth.validation";

const Register = () => {
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      age: "",
      phone: "",
      weight: "",
      goal: "",
      password: "",
      role: "user",
    },
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    try {
      const response = await dispatch(registerUser(data)).unwrap();

      if (response) {
        toast.success("User registered successfully!");
        reset();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E1E1E",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xl">
        <Card
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "linear-gradient(188deg, #d7d70c, #000000)",
            borderRadius: "15px",
            padding: "10px",
            gap: "10px",
          }}
        >
          <Box sx={{ marginTop: "50px", marginX: "50px", color: "white" }}>
            <img src={yellowFrame} alt="yellow frame" />

            <Typography sx={{ textTransform: "uppercase", fontSize: "27px" }}>
              Create Account
            </Typography>

            <Typography>
              Lorem ipsum dolor sit amet consectetur. Enim et in tellus at.
              Blandit etiam.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: "50px",
              }}
            >
              <Box sx={{ display: "flex", gap: "12px" }}>
                {RegisterInputField.slice(0, 2).map((input, i) => (
                  <DynamicInput
                    key={i}
                    name={input.name}
                    label={input.label}
                    type={input.type}
                    required={input.required}
                    register={register}
                    errors={errors}
                  />
                ))}
              </Box>

              {RegisterInputField.slice(2, 3).map((input, i) => (
                <DynamicInput
                  key={i}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  required={input.required}
                  register={register}
                  errors={errors}
                />
              ))}

              <Box sx={{ display: "flex", gap: "4px" }}>
                {RegisterInputField.slice(3, 6).map((input, i) => (
                  <DynamicInput
                    key={i}
                    name={input.name}
                    label={input.label}
                    type={input.type}
                    required={input.required}
                    register={register}
                    errors={errors}
                  />
                ))}
              </Box>

              <Box sx={{ display: "flex", gap: "12px" }}>
                {RegisterInputField.slice(6, 8).map((input, i) => (
                  <DynamicInput
                    key={i}
                    name={input.name}
                    label={input.label}
                    type={input.type}
                    required={input.required}
                    register={register}
                    errors={errors}
                  />
                ))}
              </Box>

              {RegisterInputField.slice(8, 9).map((input, i) => (
                <DynamicInput
                  key={i}
                  name={input.name}
                  label={input.label}
                  type={input.type}
                  required={input.required}
                  register={register}
                  errors={errors}
                />
              ))}

              {error && <Typography color="error">{error}</Typography>}

              <Button
                type="submit"
                size="large"
                disabled={loading}
                sx={{
                  my: 1,
                  py: "27px",
                  paddingLeft: "41px",
                  backgroundColor: "yellow",
                  color: "black",
                  fontWeight: 600,
                  borderRadius: "37px",
                  textTransform: "none",
                }}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>

              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: "center",
                  fontWeight: 300,
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>

          <Box sx={{ position: "relative", maxWidth: "555px" }}>
            <img
              src={loginImg}
              alt="login"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            <Link
              to="/"
              style={{
                fontSize: "50px",
                position: "absolute",
                right: "50px",
                top: "50px",
                color: "yellow",
                textDecoration: "none",
              }}
            >
              Fitln
            </Link>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
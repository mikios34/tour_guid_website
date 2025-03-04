import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
    } catch (error) {
      console.error("Login failed", error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={5}>
        <Typography variant="h4" align="center">Login</Typography>


        {error && <Alert severity="error">{error}</Alert>} {/* Show error message */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
         
        </form>
        <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
            <Link to="/register" style={{ textDecoration: 'none', color: 'blue',  }} >
              Don't have an account?
            </Link>
          </Typography>
      </Box>
    </Container>
  );
};

export default Login;

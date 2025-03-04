import React, { useState, useContext } from "react";
import { Container, TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const RegisterPage = () => {

    const { register } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "tourist",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            // navigate("/tours"); // Redirect to login after success
        } catch (err) {
            console.error("Registration failed", err);
            setError(err.response?.data?.message || "Registration failed.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>Register</Typography>

                {error && <Typography color="error">{error}</Typography>}

                <form onSubmit={handleSubmit}>
                    <TextField fullWidth label="First Name" name="first_name" margin="normal" onChange={handleChange} required />
                    <TextField fullWidth label="Last Name" name="last_name" margin="normal" onChange={handleChange} required />
                    <TextField fullWidth label="Email" name="email" type="email" margin="normal" onChange={handleChange} required />
                    <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} required />
                    <TextField select fullWidth label="Role" name="role" margin="normal" value={formData.role} onChange={handleChange}>
                        <MenuItem value="tourist">Tourist</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </TextField>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegisterPage;

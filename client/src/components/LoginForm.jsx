import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login } from "../features/auth/authSlice";
import { showToast } from "../features/ui/uiSlice";

function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "rahulm012005@gmail.com",
    password: "Pass@123"
  });

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(login(form));

    if (login.fulfilled.match(result)) {
      dispatch(
        showToast({
          severity: "success",
          message: "Welcome back. Login successful."
        })
      );
      navigate("/");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "grid",
        gap: 2.5
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h4">Secure login</Typography>
        <Typography color="text.secondary">
          JWT-based access for managing job roles without any mismatch in flow.
        </Typography>
      </Stack>

      {error ? <Alert severity="error">{error}</Alert> : null}

      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        fullWidth
      />

      <Button
        type="submit"
        size="large"
        variant="contained"
        disabled={isLoading}
        sx={{ py: 1.4 }}
      >
        {isLoading ? <CircularProgress size={22} color="inherit" /> : "Login"}
      </Button>
    </Box>
  );
}

export default LoginForm;

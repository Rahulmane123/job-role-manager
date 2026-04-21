import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        alignItems: "center",
        background:
          "radial-gradient(circle at top left, rgba(249,115,22,0.28), transparent 32%), linear-gradient(135deg, #f7efe4 0%, #d9efe9 52%, #eef6ef 100%)",
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3} sx={{ pr: { md: 5 } }}>
              <Typography variant="overline" color="secondary.main">
                MERN Stack Developer Task
              </Typography>
              <Typography variant="h2">
                Job role management with secure login and sharp UI.
              </Typography>
              <Typography variant="h6" color="text.secondary">
                React hooks, Redux Toolkit, MUI, Express, MongoDB, and JWT are wired together in a render-ready structure.
              </Typography>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: { xs: 3, md: 4 } }}>
              <LoginForm />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LoginPage;

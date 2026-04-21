import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AnalyticsPanel from "../components/AnalyticsPanel";
import DeleteConfirmDialog from "../components/DeleteConfirmDialog";
import JobRolesTable from "../components/JobRolesTable";
import RoleFormDialog from "../components/RoleFormDialog";
import StatsCard from "../components/StatsCard";
import { logout } from "../features/auth/authSlice";
import { showToast } from "../features/ui/uiSlice";

function DashboardPage() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.jobRoles);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(
      showToast({
        severity: "success",
        message: "You have been logged out."
      })
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, rgba(15,118,110,0.13) 0%, rgba(246,246,239,1) 24%, rgba(246,246,239,1) 100%)"
      }}
    >
      <AppBar position="sticky" color="transparent" elevation={0}>
        <Toolbar
          sx={{
            backdropFilter: "blur(18px)",
            backgroundColor: "rgba(246, 246, 239, 0.75)",
            borderBottom: "1px solid rgba(15, 118, 110, 0.08)"
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800 }}>
            Job Role Management System
          </Typography>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              {user?.name?.[0] || "A"}
            </Avatar>
            <Typography sx={{ display: { xs: "none", sm: "block" } }}>
              {user?.name}
            </Typography>
            <Button startIcon={<LogoutRoundedIcon />} onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 6,
              color: "#fff",
              background:
                "linear-gradient(135deg, rgba(23,33,43,1) 0%, rgba(15,118,110,0.94) 54%, rgba(249,115,22,0.92) 100%)"
            }}
          >
            <Stack spacing={1.2}>
              <Typography variant="overline" sx={{ opacity: 0.9 }}>
                Control center
              </Typography>
              <Typography variant="h4">
                Create, update, search, sort, and maintain every job role in one place.
              </Typography>
              <Typography sx={{ maxWidth: 760, opacity: 0.88 }}>
                Clean table layout, modal-based add and edit flow, confirmation before deletion, and feedback states are all connected through Redux Toolkit.
              </Typography>
            </Stack>
          </Box>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatsCard label="Total roles" value={items.length} accent="#0f766e" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatsCard
                label="Departments"
                value={new Set(items.map((item) => item.department)).size}
                accent="#f97316"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatsCard
                label="Senior or Lead roles"
                value={items.filter((item) => ["Senior", "Lead"].includes(item.level)).length}
                accent="#17212b"
              />
            </Grid>
          </Grid>

          <AnalyticsPanel items={items} />

          <JobRolesTable />
        </Stack>
      </Container>

      <RoleFormDialog />
      <DeleteConfirmDialog />
    </Box>
  );
}

export default DashboardPage;

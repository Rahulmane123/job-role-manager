import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

function AnalyticsPanel({ items }) {
  const departmentSummary = ["Engineering", "Sales", "HR", "Marketing", "Finance"].map(
    (department) => ({
      department,
      count: items.filter((item) => item.department === department).length
    })
  );

  const levelSummary = ["Junior", "Mid", "Senior", "Lead"].map((level) => ({
    level,
    count: items.filter((item) => item.level === level).length
  }));

  const maxDepartmentCount = Math.max(1, ...departmentSummary.map((item) => item.count));

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, lg: 7 }}>
        <Paper sx={{ p: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h6">Department overview</Typography>
            {departmentSummary.map((item) => (
              <Box key={item.department}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 0.8 }}
                >
                  <Typography>{item.department}</Typography>
                  <Typography color="text.secondary">{item.count} roles</Typography>
                </Stack>
                <Box
                  sx={{
                    height: 12,
                    borderRadius: 999,
                    backgroundColor: "rgba(23, 33, 43, 0.08)",
                    overflow: "hidden"
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      width: `${(item.count / maxDepartmentCount) * 100}%`,
                      borderRadius: 999,
                      background:
                        "linear-gradient(90deg, rgba(15,118,110,1) 0%, rgba(249,115,22,1) 100%)"
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, lg: 5 }}>
        <Paper sx={{ p: 3, height: "100%" }}>
          <Stack spacing={2}>
            <Typography variant="h6">Level breakdown</Typography>
            {levelSummary.map((item) => (
              <Stack
                key={item.level}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: 3,
                  backgroundColor: "rgba(15, 118, 110, 0.06)"
                }}
              >
                <Typography fontWeight={700}>{item.level}</Typography>
                <Typography color="text.secondary">{item.count} roles</Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default AnalyticsPanel;

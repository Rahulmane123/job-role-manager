import { Paper, Stack, Typography } from "@mui/material";

function StatsCard({ label, value, accent }) {
  return (
    <Paper
      sx={{
        p: 3,
        background: `linear-gradient(135deg, ${accent}22, rgba(255,255,255,0.94))`
      }}
    >
      <Stack spacing={1}>
        <Typography color="text.secondary">{label}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Stack>
    </Paper>
  );
}

export default StatsCard;

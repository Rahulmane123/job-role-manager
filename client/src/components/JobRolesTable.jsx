import dayjs from "dayjs";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  InputAdornment
} from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { departmentOptions } from "../constants/jobRoleOptions";
import {
  fetchJobRoles,
  setFilters,
  setPagination,
  setSelectedRole,
} from "../features/jobRoles/jobRolesSlice";
import {
  openDeleteDialog,
  openRoleDialog
} from "../features/ui/uiSlice";

function JobRolesTable() {
  const dispatch = useAppDispatch();
  const { items, filters, pagination, isLoading } = useAppSelector(
    (state) => state.jobRoles
  );

  useEffect(() => {
    dispatch(fetchJobRoles());
  }, [dispatch, filters.search, filters.department, filters.sort]);

  const paginatedItems = items.slice(
    pagination.page * pagination.rowsPerPage,
    pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
  );
  const totalPages = Math.max(1, Math.ceil(items.length / pagination.rowsPerPage));

  const handleEdit = (role) => {
    dispatch(setSelectedRole(role));
    dispatch(openRoleDialog());
  };

  const handleDelete = (role) => {
    dispatch(setSelectedRole(role));
    dispatch(openDeleteDialog());
  };
  return (
    <Paper sx={{ p: { xs: 2, md: 3 } }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h5">Job roles</Typography>
          <Typography color="text.secondary">
            Search by title, filter department, and sort by latest creation date.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineRoundedIcon />}
          onClick={() => {
            dispatch(setSelectedRole(null));
            dispatch(openRoleDialog());
          }}
        >
          Add job role
        </Button>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search job title"
          value={filters.search}
          onChange={(event) => dispatch(setFilters({ search: event.target.value }))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            )
          }}
          fullWidth
        />
        <TextField
          select
          label="Department"
          value={filters.department}
          onChange={(event) => dispatch(setFilters({ department: event.target.value }))}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All departments</MenuItem>
          {departmentOptions.map((department) => (
            <MenuItem key={department} value={department}>
              {department}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Sort by createdAt"
          value={filters.sort}
          onChange={(event) => dispatch(setFilters({ sort: event.target.value }))}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="desc">Newest first</MenuItem>
          <MenuItem value="asc">Oldest first</MenuItem>
        </TextField>
      </Stack>

      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 8 }}>
          <CircularProgress />
        </Stack>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.length ? (
                paginatedItems.map((role) => (
                  <TableRow hover key={role._id}>
                    <TableCell>
                      <Stack spacing={0.5}>
                        <Typography fontWeight={700}>{role.jobTitle}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {role.description}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{role.department}</TableCell>
                    <TableCell>
                      <Chip label={role.level} color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>{dayjs(role.createdAt).format("DD MMM YYYY")}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(role)}>
                        <EditRoundedIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(role)}>
                        <DeleteOutlineRoundedIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Stack alignItems="center" spacing={1.2} sx={{ py: 6 }}>
                      <Typography variant="h6">No job roles found</Typography>
                      <Typography color="text.secondary">
                        Create the first role or adjust the filters.
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      )}
      {!isLoading && items.length ? (
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mt: 3 }}
        >
          <Typography color="text.secondary" variant="body2">
            Showing {pagination.page * pagination.rowsPerPage + 1}-
            {Math.min(
              pagination.page * pagination.rowsPerPage + pagination.rowsPerPage,
              items.length
            )}{" "}
            of {items.length} roles
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              select
              size="small"
              label="Rows"
              value={pagination.rowsPerPage}
              onChange={(event) =>
                dispatch(
                  setPagination({
                    rowsPerPage: Number(event.target.value),
                    page: 0
                  })
                )
              }
              sx={{ minWidth: 100 }}
            >
              {[5, 10].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Pagination
              color="primary"
              count={totalPages}
              page={pagination.page + 1}
              onChange={(_, value) =>
                dispatch(
                  setPagination({
                    page: value - 1
                  })
                )
              }
            />
          </Stack>
        </Stack>
      ) : null}
    </Paper>
  );
}

export default JobRolesTable;

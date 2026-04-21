import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { departmentOptions, levelOptions } from "../constants/jobRoleOptions";
import {
  createJobRole,
  fetchJobRoles,
  resetForm,
  updateJobRole
} from "../features/jobRoles/jobRolesSlice";
import { closeRoleDialog, showToast } from "../features/ui/uiSlice";

function normalizeErrors(payload) {
  if (payload?.errors?.length) {
    return payload.errors.reduce((accumulator, item) => {
      accumulator[item.path] = item.msg;
      return accumulator;
    }, {});
  }

  return {};
}

function RoleFormDialog() {
  const dispatch = useAppDispatch();
  const { roleDialogOpen } = useAppSelector((state) => state.ui);
  const { selectedRole, isSaving } = useAppSelector((state) => state.jobRoles);
  const [form, setForm] = useState({
    jobTitle: "",
    department: "",
    level: "Junior",
    description: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedRole) {
      setForm({
        jobTitle: selectedRole.jobTitle,
        department: selectedRole.department,
        level: selectedRole.level,
        description: selectedRole.description
      });
      setErrors({});
    } else if (roleDialogOpen) {
      setForm({
        jobTitle: "",
        department: "",
        level: "Junior",
        description: ""
      });
      setErrors({});
    }
  }, [selectedRole, roleDialogOpen]);

  const handleClose = () => {
    dispatch(closeRoleDialog());
    dispatch(resetForm());
    setErrors({});
  };

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
    setErrors((current) => ({
      ...current,
      [event.target.name]: ""
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = selectedRole
      ? await dispatch(updateJobRole({ id: selectedRole._id, payload: form }))
      : await dispatch(createJobRole(form));

    if (createJobRole.fulfilled.match(result) || updateJobRole.fulfilled.match(result)) {
      dispatch(fetchJobRoles());
      dispatch(
        showToast({
          severity: "success",
          message: selectedRole
            ? "Job role updated successfully."
            : "Job role created successfully."
        })
      );
      handleClose();
      return;
    }

    setErrors(normalizeErrors(result.payload));
    dispatch(
      showToast({
        severity: "error",
        message: result.payload?.message || "Unable to save job role."
      })
    );
  };

  return (
    <Dialog open={roleDialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {selectedRole ? "Edit job role" : "Create new job role"}
      </DialogTitle>
      <DialogContent>
        <Stack component="form" onSubmit={handleSubmit} spacing={2.5} sx={{ pt: 1 }}>
          <TextField
            label="Job Title"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            error={Boolean(errors.jobTitle)}
            helperText={errors.jobTitle}
            required
          />
          <TextField
            select
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            error={Boolean(errors.department)}
            helperText={errors.department}
            required
          >
            {departmentOptions.map((department) => (
              <MenuItem key={department} value={department}>
                {department}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Level"
            name="level"
            value={form.level}
            onChange={handleChange}
            error={Boolean(errors.level)}
            helperText={errors.level}
          >
            {levelOptions.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            minRows={4}
            error={Boolean(errors.description)}
            helperText={errors.description}
            required
          />
          <button type="submit" hidden />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isSaving}>
          {selectedRole ? "Update role" : "Create role"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RoleFormDialog;

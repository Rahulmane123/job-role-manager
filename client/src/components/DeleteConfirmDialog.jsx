import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteJobRole, fetchJobRoles, resetForm } from "../features/jobRoles/jobRolesSlice";
import { closeDeleteDialog, showToast } from "../features/ui/uiSlice";

function DeleteConfirmDialog() {
  const dispatch = useAppDispatch();
  const { deleteDialogOpen } = useAppSelector((state) => state.ui);
  const { selectedRole, isSaving } = useAppSelector((state) => state.jobRoles);

  const handleClose = () => {
    dispatch(closeDeleteDialog());
    dispatch(resetForm());
  };

  const handleDelete = async () => {
    if (!selectedRole?._id) {
      return;
    }

    const result = await dispatch(deleteJobRole(selectedRole._id));

    if (deleteJobRole.fulfilled.match(result)) {
      dispatch(fetchJobRoles());
      dispatch(
        showToast({
          severity: "success",
          message: "Job role deleted successfully."
        })
      );
      handleClose();
      return;
    }

    dispatch(
      showToast({
        severity: "error",
        message: result.payload || "Unable to delete job role."
      })
    );
  };

  return (
    <Dialog open={deleteDialogOpen} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete job role</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">
          Are you sure you want to delete {selectedRole?.jobTitle || "this role"}? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained" disabled={isSaving}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmDialog;

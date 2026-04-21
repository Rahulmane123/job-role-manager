import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    roleDialogOpen: false,
    deleteDialogOpen: false,
    toast: {
      open: false,
      severity: "success",
      message: ""
    }
  },
  reducers: {
    openRoleDialog(state) {
      state.roleDialogOpen = true;
    },
    closeRoleDialog(state) {
      state.roleDialogOpen = false;
    },
    openDeleteDialog(state) {
      state.deleteDialogOpen = true;
    },
    closeDeleteDialog(state) {
      state.deleteDialogOpen = false;
    },
    showToast(state, action) {
      state.toast = {
        open: true,
        severity: action.payload.severity || "success",
        message: action.payload.message
      };
    },
    hideToast(state) {
      state.toast.open = false;
    }
  }
});

export const {
  openRoleDialog,
  closeRoleDialog,
  openDeleteDialog,
  closeDeleteDialog,
  showToast,
  hideToast
} = uiSlice.actions;

export default uiSlice.reducer;

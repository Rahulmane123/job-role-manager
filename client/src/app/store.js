import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobRolesReducer from "../features/jobRoles/jobRolesSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobRoles: jobRolesReducer,
    ui: uiReducer
  }
});

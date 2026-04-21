import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { hideToast } from "../features/ui/uiSlice";

function Toast() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state) => state.ui.toast);

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={3500}
      onClose={() => dispatch(hideToast())}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        variant="filled"
        severity={toast.severity}
        onClose={() => dispatch(hideToast())}
      >
        {toast.message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;

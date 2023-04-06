import { Alert, AlertColor, Snackbar } from "@mui/material";
import svgIconClasses from "@mui/material/SvgIcon/svgIconClasses";
import { OptionsObject, useSnackbar } from "notistack";

type useMuiSnackbarType = {
  autoHideDuration?: number;
};

const SNACKBAR_BACKGROUND_COLORS: {
  [key in AlertColor]: string;
} = {
  success: "#4caf50",
  info: "#2196f3",
  warning: "#ff9800",
  error: "#f44336",
};

export const useMuiSnackbar = ({ autoHideDuration }: useMuiSnackbarType) => {
  const { enqueueSnackbar: enqueueNotistackSnackbar, closeSnackbar } =
    useSnackbar();

  const enqueueSnackbar = (message: string, options: OptionsObject = {}) => {
    const { variant = "info", action } = options;
    // Set the default severity to 'info' because 'default' does not exist in MUI severity options
    const severity = variant === "default" ? "info" : variant;

    // The action parameter can only accept a ReactNode, so functions are not allowed.
    const actionComponent = typeof action === "function" ? undefined : action;

    enqueueNotistackSnackbar(message, {
      ...options,
      autoHideDuration: autoHideDuration ?? 3000,
      // By default, the snackbar closes after 3 seconds.
      content: (
        <Snackbar open>
          <Alert
            severity={severity}
            action={actionComponent}
            sx={{
              minWidth: "480px",
              minHeight: "96px",
              alignItems: "center",
              fontSize: 20,
              color: "#fff",
              backgroundColor: SNACKBAR_BACKGROUND_COLORS[severity],
              [`& .${svgIconClasses.root}`]: {
                color: "#fff",
                // Override the default height of the icon using 'Classes' because it causes the icon to be misaligned
                height: 1,
              },
            }}
          >
            {message}
          </Alert>
        </Snackbar>
      ),
    });
  };

  return { enqueueSnackbar, closeSnackbar };
};

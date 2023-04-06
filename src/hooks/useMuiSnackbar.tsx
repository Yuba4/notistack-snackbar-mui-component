import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import svgIconClasses from "@mui/material/SvgIcon/svgIconClasses";
import { OptionsObject, useSnackbar } from "notistack";

export const SNACKBAR_BACKGROUND_COLORS: {
  [key in AlertColor]: string;
} = {
  success: "#4caf50",
  info: "#2196f3",
  warning: "#ff9800",
  error: "#f44336",
};

export const useMuiSnackbar = () => {
  const { enqueueSnackbar: enqueueNotistackSnackbar, closeSnackbar } =
    useSnackbar();

  const enqueueSnackbar = (message: string, options: OptionsObject = {}) => {
    const { variant = "info", action } = options;
    // severityに"default"が渡せないので、ひとまず"info"にしておく
    const severity = variant === "default" ? "info" : variant;

    // actionはReactNodeでしか受け取れないので、関数は弾く
    const actionComponent = typeof action === "function" ? undefined : action;

    enqueueNotistackSnackbar(message, {
      ...options,
      autoHideDuration: 7500,
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
                // デフォルトのheightだとズレるのでClassesで上書き
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

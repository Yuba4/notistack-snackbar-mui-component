import { useCallback, ReactNode } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { AlertColor } from "@mui/material";

import { useMuiSnackbar } from "./hooks/useMuiSnackbar";

const styles = {
  button: {
    margin: 8,
    borderColor: "#313131",
    color: "#313131",
  },
  success: {
    borderColor: "#43a047",
    color: "#43a047",
  },
  error: {
    borderColor: "#f44336",
    color: "#f44336",
  },
  info: {
    borderColor: "#2196f3",
    color: "#2196f3",
  },
  warning: {
    borderColor: "#ff9800",
    color: "#ff9800",
  },
};

const MessageButtons = () => {
  const { enqueueSnackbar, closeSnackbar } = useMuiSnackbar({});

  const buttons: {
    variant: AlertColor;
    message: string;
    action?: ReactNode;
  }[] = [
    { variant: "success", message: "This is a success message!" },
    { variant: "error", message: "This is an error message!" },
    { variant: "warning", message: "This is a warning message!" },
    {
      variant: "info",
      message: "This is an information message!",
      action: (
        <Button onClick={() => closeSnackbar()} color="inherit" size="small">
          UNDO
        </Button>
      ),
    },
  ];

  const handleClick = useCallback(
    ({
        variant,
        message,
        action,
      }: {
        variant: AlertColor;
        message: string;
        action: ReactNode;
      }) =>
      () => {
        enqueueSnackbar(message, { variant, action });
      },
    [enqueueSnackbar]
  );

  return (
    <div>
      {buttons.map((button) => (
        <Button
          key={button.variant}
          variant="outlined"
          style={{ ...styles.button, ...styles[button.variant] }}
          onClick={handleClick({
            action: button.action,
            message: button.message,
            variant: button.variant,
          })}
        >
          {button.variant}
        </Button>
      ))}
    </div>
  );
};

export default MessageButtons;

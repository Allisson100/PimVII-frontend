import { Snackbar, Alert, Fade } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { SnackBarContext } from "../../contexts/SnackBarContext";

const SnackBar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const { snackBarMessage, setSnackBarMessage } = useContext(SnackBarContext);

  useEffect(() => {
    if (Object.keys(snackBarMessage).length !== 0) {
      setMessage(snackBarMessage?.message);
      setSeverity(snackBarMessage?.severity);
      setOpen(true);
      setSnackBarMessage({});
    }
    // eslint-disable-next-line
  }, [snackBarMessage]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%", display: "flex", alignItems: "center" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBar;

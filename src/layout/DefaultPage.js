import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const DefaultPage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        padding: "2rem",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#eeeded",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default DefaultPage;

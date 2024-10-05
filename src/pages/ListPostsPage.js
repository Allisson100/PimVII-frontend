import { useEffect } from "react";
import usePosts from "../hooks/api/Services/usePosts";
import MidiaSlider from "../components/MidiaSlider";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ListPostsPage = () => {
  const { listPosts, result } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    listPosts();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "calc(100vh - 4rem)",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "#eeeded",
      }}
    >
      <Box
        sx={{
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <LoadingButton
          sx={{ width: "100%", fontSize: "1rem" }}
          onClick={() => navigate("/")}
          variant="contained"
        >
          Criar Postagem
        </LoadingButton>
      </Box>
      {result?.map((item) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "40%",
              backgroundColor: "#ffffff",
              borderRadius: "1rem",
              padding: "1rem",
            }}
          >
            <Typography sx={{ fontSize: "0.8rem", fontWeight: "bold" }}>
              {item?.name}
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {item?.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MidiaSlider fileArray={item?.files} />
            </Box>

            <Typography>{item?.description}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ListPostsPage;

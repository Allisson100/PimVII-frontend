import { useState } from "react";
import instance from "../../../common/axiosConfig";
import { useSnackbar } from "notistack";

export default function usePosts() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const createPost = async (datas) => {
    setIsLoading(true);

    try {
      const response = await instance.post("/post/create", datas, {
        headers: {
          "Context-Type": "multipart/form-data",
        },
      });

      if (!response?.data?.success) throw new Error();

      enqueueSnackbar("Sucesso ao criar postagem", { variant: "success" });

      setResult(response?.data);

      return {
        success: true,
        message: "Sucesso ao criar postagem",
      };
    } catch (error) {
      enqueueSnackbar("Error ao criar postagem", { variant: "success" });
      return {
        success: true,
        message: "Error ao criar postagem",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    result,
    isLoading,
    createPost,
  };
}

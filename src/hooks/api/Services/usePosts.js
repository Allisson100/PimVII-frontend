import { useContext, useState } from "react";
import instance from "../../../common/axiosConfig";
import { SnackBarContext } from "../../../contexts/SnackBarContext";

export default function usePosts() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setSnackBarMessage } = useContext(SnackBarContext);

  const createPost = async (datas) => {
    setIsLoading(true);

    try {
      const response = await instance.post("/post/create", datas, {
        headers: {
          "Context-Type": "multipart/form-data",
        },
      });

      if (!response?.data?.success) throw new Error();

      setSnackBarMessage({
        message: "Sucesso ao criar postagem",
        severity: "success",
      });

      setResult(response?.data);

      return {
        success: true,
        message: "Sucesso ao criar postagem",
      };
    } catch (error) {
      setSnackBarMessage({
        message: "Error ao criar postagem",
        severity: "error",
      });
      return {
        success: true,
        message: "Error ao criar postagem",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const listPosts = async (datas) => {
    setIsLoading(true);

    try {
      const response = await instance.get("/post/find");

      if (!response?.data?.success) throw new Error();

      setSnackBarMessage({
        message: "Sucesso ao listar postagens",
        severity: "success",
      });

      setResult(response?.data?.posts);

      return {
        success: true,
        message: "Sucesso ao listar postagens",
      };
    } catch (error) {
      setSnackBarMessage({
        message: "Error ao listar postagens",
        severity: "error",
      });
      return {
        success: true,
        message: "Error ao listar postagens",
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    result,
    isLoading,
    createPost,
    listPosts,
  };
}

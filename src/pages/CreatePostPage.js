import { Box, Grid, TextField, Typography } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import usePosts from "../hooks/api/Services/usePosts";
import FileInputStyled from "../components/FileInputStyled";
import { SnackBarContext } from "../contexts/SnackBarContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const filesTypesPermissions = [".png", ".jpeg", ".jpg", ".mp4", ".wav"];

const CreatePostPage = () => {
  const { isLoading, createPost } = usePosts();
  const { setSnackBarMessage } = useContext(SnackBarContext);
  const navigate = useNavigate();

  const createPostSchema = Yup.object().shape({
    name: Yup.string().required("Nome é necessário"),
    title: Yup.string().required("Título é necessário"),
    description: Yup.string().required("Descrição é necessária"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      files: [],
      description: "",
      title: "",
    },
    validationSchema: createPostSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values?.files?.length === 0) {
        setSnackBarMessage({
          message: "Arquivo é necessário",
          severity: "error",
        });
        return;
      }

      const formDatas = new FormData();

      const objToSend = {
        name: values?.name,
        description: values?.description,
        title: values?.title,
      };

      formDatas.append("dataform", JSON.stringify(objToSend));

      values?.files?.forEach((file) => {
        formDatas.append("files", file);
      });

      const response = await createPost(formDatas);

      if (response?.success) {
        resetForm();
      }
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    getFieldProps,
    submitForm,
    values,
    setFieldValue,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "60%" }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography
                sx={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {" "}
                POSTAGEM{" "}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <LoadingButton
                sx={{ width: "50%", fontSize: "1rem" }}
                variant="contained"
                loading={isLoading}
                onClick={() => navigate("/list")}
              >
                Listagem
              </LoadingButton>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                {...getFieldProps("name")}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título"
                {...getFieldProps("title")}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
              />
            </Grid>
            <Grid item xs={12}>
              <FileInputStyled
                file={values?.files}
                onChange={(e) => {
                  if (
                    e.some((file) => {
                      return !filesTypesPermissions.some((ext) =>
                        file?.name?.endsWith(ext)
                      );
                    })
                  ) {
                    setSnackBarMessage({
                      message:
                        "Formato inválido! Extensões permitidas: .png, .jpeg, .jpg, .mp4, .wav",
                      severity: "error",
                    });
                    return;
                  }

                  const getFilesSize = e.reduce((acc, file) => {
                    return acc + file?.size;
                  }, 0);

                  if (getFilesSize > 1024 * 1024 * 60) {
                    setSnackBarMessage({
                      message: "O tamanho máximo permitido é de 60mb",
                      severity: "error",
                    });
                    return;
                  }

                  setFieldValue("files", e);
                }}
                placeholder="Arquivos"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                multiline
                minRows={5}
                {...getFieldProps("description")}
                error={Boolean(touched.description && errors.description)}
                helperText={touched.description && errors.description}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                width: "100%",
                height: "10%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LoadingButton
                sx={{ width: "30%", fontSize: "1rem" }}
                variant="contained"
                loading={isLoading}
                onClick={submitForm}
              >
                Criar Postagem
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default CreatePostPage;

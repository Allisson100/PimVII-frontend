import { createContext, useState } from "react";

export const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {
  const [snackBarMessage, setSnackBarMessage] = useState({});

  // setSnackBarMessage deve ter um objeto como estado com as propriedades message e severity, Exemplo:

  //   setSnackBarMessage({
  //     message: "Dados carregados com sucesso",
  //     severity: "success",
  //   });

  return (
    <SnackBarContext.Provider value={{ snackBarMessage, setSnackBarMessage }}>
      {children}
    </SnackBarContext.Provider>
  );
};

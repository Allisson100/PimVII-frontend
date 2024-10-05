import { SnackBarProvider } from "./SnackBarContext";

const ContextProviders = ({ children }) => {
  return <SnackBarProvider>{children}</SnackBarProvider>;
};

export default ContextProviders;

import { Icon } from "@iconify/react";
import { InputAdornment } from "@mui/material";
import { MuiFileInput } from "mui-file-input";

const FileInputStyled = ({
  file,
  placeholder,
  onChange,
  accept = "image/*",
  acceptMultiple = true,
  ...props
}) => (
  <MuiFileInput
    fullWidth
    value={file}
    accept={accept}
    onChange={onChange}
    multiple={acceptMultiple}
    placeholder={placeholder}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Icon icon="ion:attach" width={30} />
        </InputAdornment>
      ),
    }}
    {...props}
  />
);

export default FileInputStyled;

/* eslint-disable no-nested-ternary */
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, MobileStepper, Button } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Icon } from "@iconify/react";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const MidiaSlider = ({ fileArray, fileHeight = 255, fileWidth = 400 }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState();
  const maxSteps = fileArray?.length;

  React.useEffect(() => {
    setActiveStep(0);
  }, [fileArray]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: fileWidth, flexGrow: 1 }}>
      <Box>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {fileArray
            ?.map((item) => `${process.env.REACT_APP_AWS_ENDPOINT}${item}`)
            ?.map((filePath, index) => {
              const isImage =
                filePath?.endsWith(".png") ||
                filePath?.endsWith(".jpeg") ||
                filePath?.endsWith(".jpg");

              return (
                <div key={index}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    !isImage ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: fileHeight,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#000000",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <video
                          controls
                          style={{
                            display: "block",
                            overflow: "hidden",
                            width: "100%",
                            objectFit: "contain",
                          }}
                          src={filePath}
                        />
                      </Box>
                    ) : (
                      <Box
                        component="img"
                        sx={{
                          height: fileHeight,
                          display: "block",
                          overflow: "hidden",
                          width: "100%",
                          objectFit: "contain",
                        }}
                        src={filePath}
                        alt={`Imagem ${index}`}
                      />
                    )
                  ) : null}
                </div>
              );
            })}
        </AutoPlaySwipeableViews>
      </Box>
    </Box>
  );
};

export default MidiaSlider;

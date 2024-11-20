"use client";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamCapture() {
  const webcamRef = useRef(null);
  // store the image data after the screen shot has been taken
  const [imgSrc, setImgSrc] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      <div className="image-container flex justify-center">
        {imgSrc ? (
          <div className="image-container w-fit overflow-hidden rounded-lg">
            <img src={imgSrc} alt="Web Camera Image" />
          </div>
        ) : (
          <div className="image-container w-fit overflow-hidden rounded-lg">
            <Webcam
              width={600}
              height={600}
              ref={webcamRef}
              mirrored={true}
              screenshotFormat="image/png"
            />
          </div>
        )}
      </div>

      <div className="button-container my-4 w-full text-center">
        {imgSrc ? (
          <Button
            onClick={retake}
            variant="contained"
            endIcon={<CameraAltIcon />}
          >
            Retake
          </Button>
        ) : (
          <Button
            onClick={capture}
            variant="contained"
            endIcon={<CameraAltIcon />}
          >
            Capture
          </Button>
        )}
      </div>
    </div>
  );
}

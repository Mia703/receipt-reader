"use client";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

export default function WebcamCapture() {
  // ----- toggling cameras
  const [facingCamera, setFacingCamera] = useState<boolean>(true);
  console.log(`initial state: ${facingCamera}`);

  const toggleCamera = () => {
    setFacingCamera(!facingCamera);
    console.log(facingCamera);
  };


  // ----- taking a photo
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      <div className="capture-container flex justify-center">
        {imgSrc ? (
          <div className="image-container w-fit overflow-hidden rounded-lg">
            <img src={imgSrc} alt="Web Camera Image" />
          </div>
        ) : (
          <div className="image-container w-fit overflow-hidden rounded-lg">
            {facingCamera ? (
              <Webcam
                width={600}
                height={600}
                ref={webcamRef}
                mirrored={facingCamera ? true : false}
                screenshotFormat="image/png"
              />
            ) : (
              <Webcam
                width={600}
                height={600}
                ref={webcamRef}
                mirrored={facingCamera ? true : false}
                screenshotFormat="image/png"
                videoConstraints={{
                  facingMode: { exact: 'environment'}
                }}
              />
            )}
            
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
          <div>
            <Button
              onClick={capture}
              variant="contained"
              endIcon={<CameraAltIcon />}
            >
              Capture
            </Button>
            <Button
              variant="contained"
              onClick={() => setFacingCamera((prev) => !prev)}
            >
              Toggle Camera
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

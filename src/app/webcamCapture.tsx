"use client";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

export default function WebcamCapture() {
  // ----- toggles between front and back cameras
  const [facingCamera, setFacingCamera] = useState<boolean>(true);

  // ----- takes a photo
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot();
    setImgSrc(imageSrc);
    // process image if not null
    processImage(imageSrc!);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  // --- processing the photo
  const [processedData, setProcessedData] = useState<string | null>(null);
  const api_url = "https://api.ocr.space/parse/image";
  const key = process.env.NEXT_PUBLIC_OCR_SPACE;

  const processImage = useCallback(async (imageData: string) => {
    const formData = new FormData();
    formData.append("apikey", key as string);

    formData.append("base64Image", imageData);

    formData.append("language", "eng");
    formData.append("detectOrientation", "true");
    formData.append("isTable", "true");

    const request_options = {
      method: "POST",
      body: formData,
    };

    const api_response = await fetch(api_url, request_options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not okay");
        }
        return response.text();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error: ", error);
      });

    // return api_response if not void
    setProcessedData(api_response!);
  }, []);

  return (
    <div className="container">
      <div className="capture-container flex justify-center">
        {imgSrc ? (
          <div className="image-container w-fit overflow-hidden rounded-lg">
            <img src={imgSrc} alt="Web Camera Image" />
          </div>
        ) : (
          <div className="image-container w-fit overflow-hidden rounded-lg">
            {/* rebuilds camera component based on toggle */}
            {facingCamera ? (
              <Webcam
                width={600}
                height={600}
                ref={webcamRef}
                mirrored={true}
                screenshotFormat="image/png"
              />
            ) : (
              <Webcam
                width={600}
                height={600}
                ref={webcamRef}
                mirrored={false}
                screenshotFormat="image/png"
                videoConstraints={{
                  facingMode: { exact: "environment" },
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
      <div className="w-full">
        {processedData ? (
          <p className="break-all">{processedData}</p>
        ) : (
          <p>No data returned.</p>
        )}
      </div>
    </div>
  );
}

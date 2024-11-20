"use client";
import { Button } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

type MediaDeviceInfo = {
  deviceId: string;
  kind: string;
  label: string;
  groupId: string;
};

export default function WebcamCapture() {
  const webcamRef = useRef<Webcam>(null);
  // store the image data after the screen shot has been taken
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  const [deviceNames, setDeviceNames] = useState<MediaDeviceInfo[] | null> (null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const handleDevices = useCallback((mediaDevices: MediaDeviceInfo[]) => {
    console.log('unfiltered devices');
    console.log(mediaDevices);
    // Filter for video input devices
    const videoDevices = mediaDevices.filter(
      ({ kind }) => kind === "videoinput",
    );
    
    console.log('filtered devices');
    console.log(videoDevices);
    setDeviceNames(videoDevices);

    if (videoDevices.length > 0) {
      // Find the back camera (usually labeled "back")
      const backCamera = videoDevices.find((device) =>
        device.label.toLowerCase().includes("back"),
      );

      // Find the front camera (fallback)
      const frontCamera = videoDevices.find((device) =>
        device.label.toLowerCase().includes("front"),
      );

      // Prioritize the back camera if available, otherwise use the front camera
      setSelectedDeviceId(
        backCamera?.deviceId || frontCamera?.deviceId || null,
      );
    }
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => handleDevices(devices as MediaDeviceInfo[]))
      .catch((error) => console.error("Error enumerating devices:", error));
  }, [handleDevices]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current!.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      <div>
        <h1>Selected Camera</h1>
        {selectedDeviceId ? (
          <div>
            <p>Using device ID: {selectedDeviceId}</p>
            <p>
              filtered devices{" "}
              {deviceNames?.map((device) => <span>{device.kind}</span>)}
            </p>
          </div>
        ) : (
          <div>
            <p>No camera detected</p>
            <p>
              filtered devices{" "}
              {deviceNames?.map((device) => <span>{device.kind}</span>)}
            </p>
          </div>
        )}
      </div>

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

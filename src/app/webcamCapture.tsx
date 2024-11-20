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
  // ----- toggling cameras
  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  const [devices, setDevices] = useState<MediaDeviceInfo[] | null>([]);

  const handleDevices = useCallback((mediaDevices: MediaDeviceInfo[]) => {
    // setDevices(mediaDevices.filter(
    //   ({kind}) => kind === 'videoinput'
    // ))
    setDevices(mediaDevices)
  }, []);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);


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
      <div>
        <h1>Checking for devices</h1>
        {devices? devices.map((item, index) => (
          <p>{index}-- deviceID: "{item.deviceId}", deviceKind: "{item.kind}", deviceLabel: "{item.label}", deviceGroupID: "{item.groupId}"</p>
        )) : <p>no devices to share</p>}
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
              videoConstraints={videoConstraints}
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

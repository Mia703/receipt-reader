import Image from "next/image";
import WebcamCapture from "./webcamCapture";

export default function Home() {
  return (
    <div
      id="main-grid"
      className="grid h-dvh w-full grid-cols-4 bg-gray-200 md:grid-cols-6 lg:grid-cols-12"
    >
      <div
        id="main-content"
        className="col-span-4 m-4 h-min rounded-lg bg-white p-4 shadow-md md:col-start-2 lg:col-start-5"
      >
        <WebcamCapture />
      </div>
    </div>
  );
}

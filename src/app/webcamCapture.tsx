"use client";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

export default function WebcamCapture() {
	const webcamRef = useRef(null);
	// store the image data after the screen shot has been taken
	const [imgSrc, setImgSrc] = useState(null);

	const capture = useCallback(() => {
		if (webcamRef.current !== null) {
			const imageSrc = webcamRef.current.getScreenshot();
			setImgSrc(imageSrc);
		}
		setImgSrc(null);
	}, [webcamRef]);

	const retake = () => {
		setImgSrc(null);
	};

	return (
		<div className="container">
			<Webcam
				width={600}
				height={600}
				ref={webcamRef}
				mirrored={true}
				screenshotFormat="image/png"
			/>

			<div className="image-container">
				{imgSrc ? (
					<div>
						<img src={imgSrc} alt="webcam" />
						<p>{imgSrc}</p>
					</div>
				) : (
					<p>no image</p>
				)}
			</div>

			<div className="button-container">
				{imgSrc ? (
					<button onClick={retake}>retake</button>
				) : (
					<button onClick={capture}>capture</button>
				)}
			</div>
		</div>
	);
}

"use client";
import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import imageReader from "./imageReader";
import { redirect } from "next/dist/server/api-utils";

export default function WebcamCapture() {
	const webcamRef = useRef(null);
	// store the image data after the screen shot has been taken
	const [imgSrc, setImgSrc] = useState(null);

	const capture = useCallback(() => {
		const imageSrc = webcamRef.current.getScreenshot();
		setImgSrc(imageSrc);
		// hello("https://ocr.space/Content/Images/receipt-ocr-original.webp");
		hello(imageSrc);
	}, [webcamRef]);

	const retake = () => {
		setImgSrc(null);
	};

	const [result, setResult] = useState<string | null>(null);

	async function hello(image: string) {
		if (image != null) {
			try {
				var myHeaders = new Headers();
				myHeaders.append("apikey", "K89600633588957");

				var formdata = new FormData();
				formdata.append("base64Image", image);
				formdata.append("language", "eng");
				formdata.append("isOverlayRequired", "false");
				formdata.append("detectOrientation", "true");
				formdata.append("isTable", "false");

				var requestOptions = {
					method: "POST",
					headers: myHeaders,
					body: formdata,
					redirect: "follow",
				};

				fetch("https://api.ocr.space/parse/image", requestOptions)
					.then((response) => response.text())
					.then((result) => setResult(result))
					.then((error) => console.log("error", error));
			} catch (error) {}
		}
	}

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
						<p>{result ? result: 'none'}</p>
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

import { ocrSpace } from "ocr-space-api-wrapper";

export default async function imageReader(imageString: any) {
	try {
		const res = await ocrSpace(
			"https://ocr.space/Content/Images/receipt-ocr-original.webp",
			{
				apiKey: process.env.OCR_API_KEY,
				language: "eng",
			}
		);
		console.log(res.ParsedResults);
	} catch (error) {
		console.error(`Error: ${error}`);
	}
}

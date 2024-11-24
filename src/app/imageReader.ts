const api_url = "https://api.ocr.space/parse/image";
const key = process.env.NEXT_PUBLIC_OCR_SPACE;

export default async function imageReader(image: string, imageType: string) {
  // create the form data to be sent to the api
  const formData = new FormData();
  formData.append("apikey", key as string);

  if (imageType == "url") {
    formData.append(
      "url",
      "https://ocr.space/Content/Images/receipt-ocr-original.jpg",
    );
  } else {
    formData.append("base64Image", image);
  }

  formData.append("language", "eng");
  formData.append("detectOrientation", "true");
  formData.append("isTable", "true");

  console.log("The Form", formData);

  const request_options = {
    method: "POST",
    body: formData,
  };

  fetch(api_url, request_options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not okay");
      }
      return response.text();
    })
    .then((data) => {
      console.log("Data: ", data);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });

	// another way of displaying data is
	// const response_one = fetch(api_url, request_options);
	// const result = (await response_one).json();
	// console.log('Response One Result:', result);
	// OR
	// const response_two = await fetch (api_url, request_options).then(
		// contains the same inform from the fetch above
	// );
	// console.log('Response Two Result:', response_two);
}

import axios from 'axios';

export const recognizeFashionItems = async (imageData: string): Promise<string[]> => {
  const apiKey = process.env.GOOGLE_CLOUD_VISION_API_KEY as string;

  // Debugging: Log API key presence
  if (!apiKey) {
    console.error('GOOGLE_CLOUD_VISION_API_KEY is not set');
    throw new Error('GOOGLE_CLOUD_VISION_API_KEY is not set');
  }

  // Log the length of the incoming imageData
  console.log('Received image data length:', imageData.length);

  // Ensure that imageData contains base64 image data
  if (!imageData.startsWith('data:image/')) {
    console.error('Invalid image data format');
    throw new Error('Invalid image data format');
  }

  // Remove data URI scheme prefix
  const base64Image = imageData.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');

  // Log the length of the base64Image
  console.log('Base64 image data length:', base64Image.length);

  try {
    const response = await axios.post(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        requests: [
          {
            image: {
              content: base64Image,
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 10,
              },
            ],
          },
        ],
      }
    );

    // Debugging: Log the response data
    console.log('Google Vision API response:', response.data);

    const labels = response.data.responses[0].labelAnnotations;

    if (labels) {
      // Log each label detected
      console.log('Labels detected:');
      labels.forEach((label: any) => {
        console.log(label.description);
      });

      // Filter labels to include only those related to clothing
      const fashionItems = labels
        .filter((label: any) => label.description.toLowerCase().includes('clothing'))
        .map((label: any) => label.description);

      // Debugging: Log the fashion items detected
      console.log('Fashion items detected:', fashionItems);

      return fashionItems;
    } else {
      console.log('No labels detected');
      return [];
    }
  } catch (error) {
    console.error('Error recognizing fashion items:', error);
    throw new Error('Failed to recognize fashion items');
  }
};

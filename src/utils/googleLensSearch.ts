import axios from 'axios';

export async function googleLensSearch(imageUrl: string): Promise<any> {
  const params = new URLSearchParams({
    api_key: process.env.SERPAPI_API_KEY || '',
    engine: 'google_lens',
    url: imageUrl
  });

  try {
    const response = await axios.get(`https://serpapi.com/search`, {
      params: params
    });
    return response.data;
  } catch (error) {
    console.error('Error performing Google Lens search:', error);
    throw new Error('Failed to perform Google Lens search');
  }
}
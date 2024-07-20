import axios from 'axios';
import FormData from 'form-data';

export async function uploadToImgBB(base64Image: string): Promise<string> {
  const formData = new FormData();
  formData.append('image', base64Image.split(',')[1]); // Remove the "data:image/jpeg;base64," part

  try {
    const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
      params: {
        key: process.env.IMGBB_API_KEY,
      },
      headers: formData.getHeaders(),
    });

    if (response.data.success) {
        console.log(response.data.data.url)
      return response.data.data.url;

    } else {
      throw new Error('Failed to upload image to ImgBB');
    }
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    throw new Error('Failed to upload image to ImgBB');
  }
}
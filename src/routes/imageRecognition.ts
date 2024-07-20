import { Router } from 'express';
import { recognizeFashionItems } from '../imageRecognition';

export const imageRecognition = Router();

imageRecognition.post('/', async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'Image data is required' });
  }

  try {
    const items = await recognizeFashionItems(image);
    res.json({ items });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

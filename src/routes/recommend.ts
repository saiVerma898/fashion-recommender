import { Router } from 'express';
import { recognizeFashionItems } from '../imageRecognition';
import { searchProducts } from '../productSearch';

export const recommend = Router();

recommend.post('/', async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'Image data is required' });
  }

  try {
    const items = await recognizeFashionItems(image);
    console.log(items)
    const recommendations = [];

    for (const item of items) {
      const products = await searchProducts(item);
      recommendations.push(...products);
    }

    res.json({ recommendations });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

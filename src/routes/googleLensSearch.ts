import express from 'express';
import { uploadToImgBB } from '../utils/imageUpload';
import { googleLensSearch } from '../utils/googleLensSearch';

const router = express.Router();

interface VisualMatch {
  position: number;
  title: string;
  link: string;
  source: string;
  source_icon: string;
  price?: {
    value: string;
    extracted_value: number;
    currency: string;
  };
  thumbnail: string;
  in_stock?: boolean;
}

router.get('/test', (req, res) => {
  res.json({ message: 'Google Lens Search route is working' });
});

router.post('/', async (req, res, next) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Upload image to ImgBB
    const imageUrl = await uploadToImgBB(image);
    console.log('Uploaded image URL:', imageUrl);

    // Perform Google Lens search using SerpAPI
    const searchResults = await googleLensSearch(imageUrl);
    
    // Log all search results
    console.log('Google Lens search results:', JSON.stringify(searchResults, null, 2));

    // Extract visual matches
    const visualMatches: VisualMatch[] = searchResults.visual_matches || [];

    // Filter and sort visual matches by price (new and used, low to high)
    const sortedMatches = visualMatches
      .filter((match): match is VisualMatch & { price: { extracted_value: number } } => !!match.price && match.price.extracted_value !== undefined)
      .sort((a, b) => {
        const priceA = parseFloat(a.price.extracted_value.toString());
        const priceB = parseFloat(b.price.extracted_value.toString());
        return priceA - priceB;
      })
      .map(match => ({
        store: match.source,
        link: match.link,
        price: match.price.value,
        image: match.thumbnail
      }));

    // Return cleaned and sorted results
    res.json({
      imageUrl,
      searchResults: sortedMatches
    });
  } catch (error) {
    console.error('Error in Google Lens search route:', error);
    next(error);
  }
});

export const googleLensSearchRouter = router;

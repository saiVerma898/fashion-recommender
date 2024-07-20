import express from 'express';
import bodyParser from 'body-parser';
import { recommend } from './routes/recommend';
import { imageRecognition } from './routes/imageRecognition';
import { googleLensSearchRouter } from './routes/googleLensSearch';
import dotenv from 'dotenv';

dotenv.config();

console.log('Google Cloud Vision API Key:', process.env.GOOGLE_CLOUD_VISION_API_KEY);

const app = express();
const port = process.env.PORT || 3000;

// Increase body size limit
app.use(bodyParser.json({ limit: '800mb' }));
app.use(bodyParser.urlencoded({ limit: '800mb', extended: true }));

app.use('/recommend', recommend);
app.use('/image-recognition', imageRecognition);
app.use('/google-lens-search', googleLensSearchRouter); 


app.get('/', (req, res) => {
  res.send('Fashion Recommender API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

import dotenv from 'dotenv';

dotenv.config();

export const GOOGLE_CLOUD_VISION_API_KEY = process.env.GOOGLE_CLOUD_VISION_API_KEY || '';
export const AMAZON_API_KEY = process.env.AMAZON_API_KEY || '';
export const EBAY_API_KEY = process.env.EBAY_API_KEY || '';

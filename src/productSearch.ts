import axios from 'axios';

export const searchProducts = async (item: string): Promise<any[]> => {
  const amazonApiKey = process.env.AMAZON_API_KEY as string;
  const ebayApiKey = process.env.EBAY_API_KEY as string;

  // Example call to Amazon API
  const amazonResponse = await axios.get(
    `https://api.amazon.com/products?query=${item}`,
    {
      headers: { Authorization: `Bearer ${amazonApiKey}` },
    }
  );
  const amazonProducts = amazonResponse.data;

  // Example call to eBay API
  const ebayResponse = await axios.get(
    `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${item}`,
    {
      headers: { Authorization: `Bearer ${ebayApiKey}` },
    }
  );
  const ebayProducts = ebayResponse.data.itemSummaries;

  return [...amazonProducts, ...ebayProducts];
};

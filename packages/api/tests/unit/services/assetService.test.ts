import { fetchAssets } from '../../../src/services/assetService';

// Mock axios
jest.mock('axios', () => ({
  get: jest.fn(),
}));

import axios from 'axios';

describe('Asset Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchAssets', () => {
    it('should fetch assets successfully with default parameters', async () => {
      const mockResponse = {
        data: {
          data: [
            {
              id: 1,
              name: 'Bitcoin',
              symbol: 'BTC',
              quote: {
                USD: {
                  price: 50000,
                  market_cap: 1000000000,
                  volume_24h: 50000000
                }
              }
            }
          ]
        }
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchAssets({
        start: 1,
        limit: 10,
        convert: 'USD'
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('cryptocurrency/listings/latest'),
        expect.objectContaining({
          params: {
            start: 1,
            limit: 10,
            convert: 'USD'
          }
        })
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('should fetch assets with custom parameters', async () => {
      const mockResponse = {
        data: {
          data: [
            {
              id: 2,
              name: 'Ethereum',
              symbol: 'ETH',
              quote: {
                USD: {
                  price: 3000,
                  market_cap: 500000000,
                  volume_24h: 25000000
                }
              }
            }
          ]
        }
      };

      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchAssets({
        start: 2,
        limit: 5,
        convert: 'EUR'
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('cryptocurrency/listings/latest'),
        expect.objectContaining({
          params: {
            start: 2,
            limit: 5,
            convert: 'EUR'
          }
        })
      );

      expect(result).toEqual(mockResponse.data);
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('API request failed');
      (axios.get as jest.Mock).mockRejectedValue(error);

      await expect(fetchAssets({
        start: 1,
        limit: 10,
        convert: 'USD'
      })).rejects.toThrow('API request failed');

      expect(axios.get).toHaveBeenCalled();
    });

    it('should handle network timeouts', async () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      (axios.get as jest.Mock).mockRejectedValue(timeoutError);

      await expect(fetchAssets({
        start: 1,
        limit: 10,
        convert: 'USD'
      })).rejects.toThrow('Request timeout');
    });

    it('should handle malformed API responses', async () => {
      const malformedResponse = {
        data: {
          // Missing expected data structure
          status: 'error',
          message: 'Invalid response'
        }
      };

      (axios.get as jest.Mock).mockResolvedValue(malformedResponse);

      const result = await fetchAssets({
        start: 1,
        limit: 10,
        convert: 'USD'
      });

      expect(result).toEqual(malformedResponse.data);
    });

    it('should use correct API endpoint and headers', async () => {
      const mockResponse = { data: { data: [] } };
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      await fetchAssets({
        start: 1,
        limit: 10,
        convert: 'USD'
      });

      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('pro-api.coinmarketcap.com'),
        expect.objectContaining({
          headers: expect.objectContaining({
            'X-CMC_PRO_API_KEY': expect.any(String)
          })
        })
      );
    });
  });
}); 
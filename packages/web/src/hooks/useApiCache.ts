import { useState, useEffect, useCallback } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheStore {
  [key: string]: CacheEntry<any>;
}

class ApiCache {
  private cache: CacheStore = {};
  private readonly defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.cache[key] = {
      data,
      timestamp: Date.now(),
      ttl,
    };
  }

  get<T>(key: string): T | null {
    const entry = this.cache[key];
    if (!entry) return null;

    const isExpired = Date.now() - entry.timestamp > entry.ttl;
    if (isExpired) {
      delete this.cache[key];
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache = {};
  }

  remove(key: string): void {
    delete this.cache[key];
  }

  getStats(): { size: number; keys: string[] } {
    return {
      size: Object.keys(this.cache).length,
      keys: Object.keys(this.cache),
    };
  }
}

// Global cache instance
const apiCache = new ApiCache();

export function useApiCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl: number = 5 * 60 * 1000
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first (unless forcing refresh)
      if (!forceRefresh) {
        const cachedData = apiCache.get<T>(key);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }
      }

      // Fetch fresh data
      const freshData = await fetcher();
      
      // Cache the result
      apiCache.set(key, freshData, ttl);
      
      setData(freshData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, ttl]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  const clearCache = useCallback(() => {
    apiCache.remove(key);
  }, [key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    clearCache,
  };
}

export { apiCache }; 
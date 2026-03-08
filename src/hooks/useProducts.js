import { useState, useEffect, useRef } from 'react';
import productService from '../services/productService';

// ── Simple in-memory cache ──
const cache = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key) {
  const entry = cache[key];
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  return null;
}

function setCache(key, data) {
  cache[key] = { data, timestamp: Date.now() };
}

/**
 * useProducts — fetch products from any productService method.
 * Returns { data, loading, error, refetch }.
 *
 * @param {'getHomeFeed'|'getTopRated'|'getLatest'|'getNearMe'|'search'|'getByCategory'} method
 * @param {any} [params] — arguments to pass to the service method
 * @param {{ enabled?: boolean }} [options]
 */
export default function useProducts(method, params = null, options = {}) {
  const { enabled = true } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  const cacheKey = `${method}:${JSON.stringify(params)}`;

  const fetchData = async () => {
    // Check cache first
    const cached = getCached(cacheKey);
    if (cached) {
      setData(cached);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const fn = productService[method];
      if (!fn) throw new Error(`Unknown method: ${method}`);

      const res = params ? await fn(params) : await fn();
      if (mountedRef.current) {
        const responseData = res.data;
        setData(responseData);
        setCache(cacheKey, responseData);
      }
    } catch (err) {
      if (mountedRef.current) {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    if (enabled) fetchData();
    return () => { mountedRef.current = false; };
  }, [method, JSON.stringify(params), enabled]);

  return { data, loading, error, refetch: fetchData };
}

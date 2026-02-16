// Simple in-memory cache (Redis-ready pattern)
class Cache {
  constructor() {
    this.store = new Map();
    this.ttls = new Map();
  }

  set(key, value, ttl = 300) {
    this.store.set(key, value);
    
    if (ttl) {
      const expiry = Date.now() + ttl * 1000;
      this.ttls.set(key, expiry);
      
      setTimeout(() => {
        this.delete(key);
      }, ttl * 1000);
    }
    
    return true;
  }

  get(key) {
    const expiry = this.ttls.get(key);
    
    if (expiry && Date.now() > expiry) {
      this.delete(key);
      return null;
    }
    
    return this.store.get(key);
  }

  delete(key) {
    this.store.delete(key);
    this.ttls.delete(key);
    return true;
  }

  clear() {
    this.store.clear();
    this.ttls.clear();
    return true;
  }

  has(key) {
    return this.store.has(key) && (!this.ttls.has(key) || Date.now() <= this.ttls.get(key));
  }
}

export const cache = new Cache();

// Cache middleware
export const cacheMiddleware = (ttl = 300) => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    const key = `cache:${req.originalUrl}`;
    const cached = cache.get(key);

    if (cached) {
      return res.json(cached);
    }

    const originalJson = res.json.bind(res);
    res.json = (data) => {
      cache.set(key, data, ttl);
      return originalJson(data);
    };

    next();
  };
};

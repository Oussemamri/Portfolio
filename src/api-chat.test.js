// Tests the actual serverless function in api/chat.js directly (CRA's Jest
// config only discovers tests under src/, so the test file lives here, but
// requires the real production file — no duplicated logic).
const handler = require('../api/chat');

const createMockReq = ({ method = 'POST', body = {}, origin = 'https://oussemaamri.com' } = {}) => ({
  method,
  body,
  headers: { origin },
});

const createMockRes = () => {
  const res = {
    statusCode: null,
    body: null,
    headers: {},
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
    end() {
      return this;
    },
  };
  return res;
};

describe('api/chat.js', () => {
  const originalApiKey = process.env.GROQ_API_KEY;

  afterEach(() => {
    process.env.GROQ_API_KEY = originalApiKey;
  });

  test('responds 200 with no body for OPTIONS preflight', async () => {
    const req = createMockReq({ method: 'OPTIONS' });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(200);
  });

  test('rejects non-POST methods', async () => {
    const req = createMockReq({ method: 'GET' });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(455);
    expect(res.body).toEqual({ error: 'Method Not Allowed' });
  });

  test('rejects a missing message', async () => {
    const req = createMockReq({ body: {} });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Message is required' });
  });

  test('rejects a non-string message', async () => {
    const req = createMockReq({ body: { message: 12345 } });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Message is required' });
  });

  test('rejects a message over 500 characters', async () => {
    const req = createMockReq({ body: { message: 'a'.repeat(501) } });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Message is too long (max 500 characters)' });
  });

  test('accepts a message at exactly 500 characters (boundary)', async () => {
    delete process.env.GROQ_API_KEY;
    const req = createMockReq({ body: { message: 'a'.repeat(500) } });
    const res = createMockRes();
    await handler(req, res);
    // Should pass length validation and fail on the missing-key check instead,
    // not the length check — proves the boundary is inclusive.
    expect(res.body).not.toEqual({ error: 'Message is too long (max 500 characters)' });
  });

  test('returns 500 when GROQ_API_KEY is not configured', async () => {
    delete process.env.GROQ_API_KEY;
    const req = createMockReq({ body: { message: 'hello' } });
    const res = createMockRes();
    await handler(req, res);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toMatch(/temporarily unavailable/i);
  });

  test('reflects an allowed origin in Access-Control-Allow-Origin', async () => {
    const req = createMockReq({ method: 'OPTIONS', origin: 'https://www.oussemaamri.com' });
    const res = createMockRes();
    await handler(req, res);
    expect(res.headers['Access-Control-Allow-Origin']).toBe('https://www.oussemaamri.com');
  });

  test('falls back to the primary origin for a disallowed Origin header', async () => {
    const req = createMockReq({ method: 'OPTIONS', origin: 'https://evil.example.com' });
    const res = createMockRes();
    await handler(req, res);
    expect(res.headers['Access-Control-Allow-Origin']).toBe('https://oussemaamri.com');
  });
});

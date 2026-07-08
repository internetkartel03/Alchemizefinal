const http = require('http');
const port = process.env.PORT || 8787;

const respondJson = (res, obj) => {
  const s = JSON.stringify(obj);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(s);
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    return respondJson(res, { status: 'ok', message: 'API is running' });
  }

  if (req.method === 'POST' && req.url === '/api/trpc/status.get') {
    // Respond with a tRPC-like envelope result
    const payload = {
      id: null,
      result: {
        data: {
          status: 'ok',
          timestamp: new Date().toISOString(),
          message: 'Alchemize backend API is reachable',
        },
      },
    };
    return respondJson(res, payload);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(port, () => {
  console.log(`[mock-server] listening on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});

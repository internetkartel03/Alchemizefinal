import app from './hono';

const port = Number(process.env.PORT || 8787);

// @ts-ignore — Hono backend server setup (optional, not used in MVP)
app.listen({ port }).then(() => {
  console.log(`[backend] Listening on http://localhost:${port}`);
}).catch((err: any) => {
  console.error('[backend] Failed to start server:', err);
  process.exit(1);
});

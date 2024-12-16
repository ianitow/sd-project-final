
import { imagesRouter } from './routes/images.js';
import { serversRouter } from './routes/servers.js';
import { router } from './rpc.js';

export const appRouter = router({
  images: imagesRouter,
  servers: serversRouter
});

export type AppRouter = typeof appRouter;

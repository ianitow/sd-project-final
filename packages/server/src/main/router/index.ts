
import { imagesRouter } from './routes/images.js';
import { router } from './rpc.js';

export const appRouter = router({
  images: imagesRouter
});

export type AppRouter = typeof appRouter;

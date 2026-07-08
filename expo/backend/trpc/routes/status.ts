import { createTRPCRouter, publicProcedure } from "../create-context";

export const statusRouter = createTRPCRouter({
  get: publicProcedure.query(() => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "Alchemize backend API is reachable",
    };
  }),
});

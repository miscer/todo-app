import { handlers } from "./handlers";

async function setup() {
  if (typeof window !== "undefined") {
    const { setupWorker } = await import("msw");
    const worker = setupWorker(...handlers);
    await worker.start();
    return worker;
  } else {
    const { setupServer } = await import("msw/node");
    const server = setupServer(...handlers);
    server.listen();
    return server;
  }
}

export const api = setup();

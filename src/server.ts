
import http, { Server } from "http";
import app from './app';
import config from './config';
import { initializeSocket } from "./socketServer";

const myServer = http.createServer(app);



async function bootstrap() {

  const server: Server = myServer.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
  initializeSocket(server);
  const exitHandler = () => {

    if (server) {
      server.close(() => {
        console.log('Server closed');
      });
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    console.log(error);
    exitHandler();
  };

  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);

  process.on('SIGTERM', () => {
    // console.log('SIGTERM received');
    if (server) {
      server.close();
    }
  });
}

bootstrap();
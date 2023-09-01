import config from './config';
import app from './app';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

// handle uncaught exception error if any developer take mistake, work it synchronous
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

// assign server into server variable
let server: Server;

const startServer = async () => {
  try {
    // server listening
    server = app.listen(config.port, () => {
      logger.info(`SMA Core Service is Running on ${config.port}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      errorLogger.error(error.message);
    }
  }

  // though which we can handle async and synchronous api error
  process.on('unhandledRejection', error => {
    // check server is running, if running close it server smoothly
    // otherwise server stop immediately
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

startServer();

// handle error, if unfortunately stop terminal, process, server off
// we can send signal to stop process
process.on('SIGTERM', () => {
  // since we would like to stop server, so we can use info
  logger.info('Signal termination is received');
  if (server) {
    server.close();
  }
});

/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from './config/index.js';
import app from './app.js';
let server;
process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});
async function boostrap() {
  try {
    await mongoose.connect(config.database_url);
    console.log('DB connected');
    console.log(config.port);
    server = app.listen(config.port, () => {
      console.log(config.port);
    });
  } catch (error) {
    console.log('Failed to connect' + error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.log(error);
        process.exit(1);
      });
    } else process.exit(1);
  });
}
boostrap();
process.on('SIGTERM', error => {
  console.log('SIGTERM recieved' + error);
  if (server) server.close();
});

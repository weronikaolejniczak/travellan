import { config } from 'dotenv';
import express from 'express';
import constants from './config/constants';
import apiEndpoints from './endpoints';
import middlewareConfig from './middleware';

const app = express();

config();
middlewareConfig(app);
apiEndpoints(app);

const PORT = constants.PORT;

app.listen(PORT, () => {
  console.info(`Server is running at http://localhost:${PORT}/`);
});

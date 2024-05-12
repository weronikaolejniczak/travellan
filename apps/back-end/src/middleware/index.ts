import bodyParser from 'body-parser';
import cors from 'cors';

const env = process.env.NODE_ENV;
const isDev = env === 'development';
const isProd = env === 'production';

export default (app) => {
  if (isProd) {
    // app.use(compression());
    // app.use(helmet());
    // app.use(morgan('tiny'));
  }

  app.use(bodyParser.json());

  if (isDev) {
    const corsOptions = {
      origin: '*',
    };

    app.use(cors(corsOptions));
    // app.use(morgan('dev'));
  }
};

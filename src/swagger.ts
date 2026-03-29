import swaggerJsdoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hacker News Crawler API',
      version: '1.0.0',
      description: 'Hacker News crawler with filtering operations',
    },
  },
  apis: [`${__dirname}/routes/HackerNewsRoutes.ts`],
};

export default swaggerJsdoc(options);

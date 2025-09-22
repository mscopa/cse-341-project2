const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Meetup api',
        description: 'An api to manage meetup sessions, an event from the Church of Jesus Christ, around the country.'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
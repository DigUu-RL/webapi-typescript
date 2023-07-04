import express, { response } from 'express';

const server = express();

server.get('/api/health', (_, response) => {
    return response.send('Relax, I\'m healthy! :)');
});

export { server };
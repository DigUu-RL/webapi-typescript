import express, { response } from 'express';

const server = express();

interface Teste {

}

server.get('/api/health', (_, response) => {
    return response.send('Relax, I\'m healthy! :)');
});

export { server };

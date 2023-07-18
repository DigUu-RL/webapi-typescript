import { server } from './server/Server';

const port = process.env.PORT;
server.listen(port || 9000, () => console.log('API is running!'));

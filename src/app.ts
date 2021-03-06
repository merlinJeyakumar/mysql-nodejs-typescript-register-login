import express from 'express'
import MasterRouter from './routers/MasterRouter';
import configuration from './config/configuration'


class Server {
    public app = express();
    public router = MasterRouter;
}

const server = new Server();
server.app.use('/api', server.router);

((port = configuration.server.port) => {
    server.app.listen(port, () => {
        console.log(`listening http://localhost:${port}/api/`)
    })
})();
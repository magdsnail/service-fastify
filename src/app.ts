import "reflect-metadata"

import DBConnector from './db-connector';
import Logger from './logger'
import Server from './api-service';

export interface ConfigObject {
    Server: object;
    DataBase: object;
}

export class App {
    readonly config: ConfigObject;
    apiServer: Server;
    db: DBConnector;

    constructor(config: ConfigObject) {
        this.config = config;
        // this.db = new DBConnector(this);
        this.apiServer = new Server(this);
    }

    async init() {
        Logger.info('init pay-module..');
        // await this.db.init();
        await this.apiServer.init();
    }

    async start() {
        Logger.info('start pay-module..');
        // await this.db.start();
        await this.apiServer.start();
    }

    async shutdown() {
        Logger.info('shutdown pay-module..');
        await this.apiServer.shutdown();
        // await this.db.shutdown();
    }
}
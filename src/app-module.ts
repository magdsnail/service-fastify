import { App, ConfigObject } from './app'
import { EventEmitter } from 'events';

export abstract class AppModule extends EventEmitter {
    protected app: App;
    protected config: ConfigObject;

    constructor(app: App) {
        super();

        this.app = app;
        this.config = app.config;
    }

    abstract init(): Promise<void>;
    abstract start(): Promise<void>;

    shutdown(): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve()
        });
    }
}
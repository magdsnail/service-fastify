import Logger from './logger';
import { App, ConfigObject } from './app'
import Config from './config.json'

process.on('unhandledRejection', (reason: any, promise: Promise<any>): void => {
    promise.catch((error) => {
        Logger.error('rejected promise - ', error);
    });
    // process.exit(1);
});

process.on('uncaughtException', (error: Error) => {
    Logger.error('unhandle error - ', error);
    // process.exit(1);
});

async function bootstrap() {
    const app = new App(<ConfigObject>Config);
    process.on('SIGINT', () => {
        Logger.info('catch ctrl-c...');
        app.shutdown()
            .then(() => {
                Logger.info('App exit.');
                process.exit(0);
            })
    });
    
    try {
        await app.init();
        await app.start();
        Logger.info('App start.');
    } catch (error) {
       console.log("🚀 ~ file: main.ts ~ line 33 ~ bootstrap ~ error", error);
    }
}

bootstrap();
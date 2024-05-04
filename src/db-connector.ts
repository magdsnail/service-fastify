import { AppModule } from './app-module';
import { DataSource } from 'typeorm';

interface DatabaseOptions {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
  synchronize: boolean;
}

export default class DBConnector extends AppModule {
  public datasource!: DataSource;

  async init(): Promise<void> {
    const opts = (this.config.DataBase as DatabaseOptions);
    return new Promise<void>((resolve, reject) => {
      this.datasource = new DataSource({
        type: 'mysql',
        host: opts.host,
        port: opts.port,
        username: opts.username,
        password: opts.password,
        database: opts.database,
        entities: [__dirname + "/entity/*{.js,.ts}"],
        synchronize: opts.synchronize,
        logging: opts.logging
      });
      resolve();
    });
  }

  async start(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.datasource.initialize().then(() => {
        resolve();
      }).catch(e => {
        reject(e);
      })
    })
  }

  async shutdown(): Promise<void> {
    if (this.datasource) {
      this.datasource.destroy();
    }
  }



}
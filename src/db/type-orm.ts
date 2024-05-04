import { BaseConnector } from './base'
import { DataSource } from 'typeorm';

export default class TypeOrm extends BaseConnector {
  protected connection!: DataSource

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      const dataSource = new DataSource({
        ...this.opts.dbconfig
      });
      dataSource.initialize().then((conn) => {
        this.connection = conn;
        resolve();
      }).catch((e) => {
        reject(e)
      });
    })

  }

  shutdown(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.connection) {
        this.connection.destroy();
      }
      resolve();
    })
  }

}


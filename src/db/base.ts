export interface Connectorptions {
  [key: string]: any
}

export class BaseConnector {
  protected opts: Connectorptions;

  constructor(opts: Connectorptions) {
    this.opts = opts;
  }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  shutdown(): Promise<void> {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

}
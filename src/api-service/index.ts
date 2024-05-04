import fs from 'fs';
import path from 'path';
import Fastify, { FastifyInstance, FastifyRequest } from 'fastify';
import FastifyCors from '@fastify/cors'

import Logger from '../logger';
import { AppModule } from '../app-module';
import DBConnector from '../db-connector';
import { App } from '../app';

export type customBody = any;
interface ServerOptions {
  host: string;
  port: number;
  prefix: string;
}

export interface customerReq extends FastifyRequest {
  db: DBConnector;
  app: App
}

export interface customerInstant extends FastifyInstance {
  app: App;
}

export default class Server extends AppModule {
  private options!: ServerOptions;
  private dirName: string = '';

  public readonly fastify = Fastify({
    logger: true,
    disableRequestLogging: true
  });

  init(): Promise<void> {
    this.options = <ServerOptions>this.config.Server;

    this.fastify.register(FastifyCors);
    this.fastify.decorate('app', this.app);

    this.fastify.addHook('onRequest', (req, reply, done) => {
      Logger.debug('url = ' + req.url);
      // (<customerReq>req).db = this.app.db;
      // (<customerReq>req).app = this.app;
      done();
    })
    return this.scanDirs(path.join(__dirname, './route'));
  }

  start(): Promise<void> {
    try {
      return new Promise<void>((resolve) => {
        this.fastify.listen({ port: this.options.port, host: this.options.host });
        return resolve();
      });
    } catch (error) {
      console.log("🚀 ~ file: index.ts ~ line 58 ~ Server ~ start ~ error", error);
      throw new Error(JSON.stringify(error));
    }

  }

  async scanDirs(dir: string): Promise<void> {
    const files = fs.readdirSync(dir);
    for (let file of files) {
      const f = path.join(dir, file);
      let pre = '';
      const extname = path.extname(f);
      if (extname) {
        pre = f.split(path.sep).slice(-2)[0];
      } else {
        pre = f.split(path.sep).slice(-1)[0];
      }
      if (fs.statSync(f).isFile()) {
        if (path.extname(f).match(/\.[jt]s$/)) {
          const basename = path.basename(f, extname);
          await this.loadRoute(f, pre == 'route' ? '' : pre, basename);
          Logger.debug('load file - ' + f);
        }
      } else if (fs.statSync(f).isDirectory()) {
        Logger.debug('dir - ' + f);
        await this.scanDirs(f);
      }
    }

  }

  async loadRoute(f: string, pre: string = '', basename: string = ''): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      import(f).then((script) => {
        const route = script.default;
        if (route) {
          const path = (pre ? '/' + pre : '') + (route.prefix ?? '') + (route.url ?? basename);
          this.fastify.register(async function (server, opts) {
            server.route({
              url: path,
              method: route.method,
              schema: route.schema,
              handler: route.handler,
              preHandler: route.preHandler
            })
          }, { prefix: this.options.prefix })
          Logger.info('load route - ' + `${route.method}:${this.options.prefix}${path}`);
        }
        resolve();
      }).catch(err => {
        reject(err);
      });
    });
  }



}
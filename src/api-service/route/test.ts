import { RouteBase } from '../route-base';
import Logger from '../../logger';
import { customBody, customerInstant } from '../';
import helper from '../../helper';
import DBConnector from '../../db-connector';
import { Equal } from 'typeorm';

export default <RouteBase>{
  url: '/test',
  method: 'GET',
  handler: async function (req, reply) {
    reply.send({
      code: 0,
      message: 'success'
    });
  }
}




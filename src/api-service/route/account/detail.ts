
import { RouteBase } from '../../route-base';

export default {
    url: '/user',
    method: 'GET',
    handler: async function (req, reply) {
        reply.send({
            code: 0,
            result: {
                name: 'xiaoming',
                age: 18
            }
        })
    }
} as RouteBase;
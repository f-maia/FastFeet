import { Request, Response } from 'express';

import GetOrdersService from '../services/GetOrdersService';

class DeliveriesController {
  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { q, page } = req.query;

    const query = q || '';

    const conditions = {
      deliveryman_id: id,
    };

    const [orders, totalCount] = await GetOrdersService.run(query, page, conditions);

    return res.header('X-Total-Count', String(totalCount)).json(orders);
  }
}

export default new DeliveriesController();

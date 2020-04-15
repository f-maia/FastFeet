import { Request, Response } from 'express';
import { Op } from 'sequelize';

import GetOrdersService from '../services/GetOrdersService';

class DeliveriesController {
  async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { page, filter } = req.query;

    const filters =
      filter === 'delivered'
        ? {
            end_date: {
              [Op.not]: null,
            },
            canceled_at: null,
          }
        : {
            end_date: null,
          };

    const conditions = {
      deliveryman_id: id,
      ...filters,
    };

    const [orders, totalCount] = await GetOrdersService.run(
      '',
      page,
      conditions
    );

    return res.header('X-Total-Count', String(totalCount)).json(orders);
  }
}

export default new DeliveriesController();

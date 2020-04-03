import { Request, Response } from 'express';
import { Op } from 'sequelize';

import DeliveryProblem from '../schemas/DeliveryProblem';

import GetOrdersService from '../services/GetOrdersService';

class DeliveryProblemController {
  async index(req: Request, res: Response): Promise<Response> {
    const { page } = req.query;
    const query = '';

    let limit = null;
    let offset = 0;
    if(page){
      limit = 6;
      offset = (page - 1) * limit;
    }

    const totalCount = await DeliveryProblem.count({});
    const problems = await DeliveryProblem.find().limit(limit).skip(offset).sort({ updated_at: -1 });
    const deliveriesId = problems.map(problem => problem.delivery_id);
    const uniqueDeliveriesId = Array.from(new Set(deliveriesId));

    const conditions = {
      id: {
        [Op.in]: uniqueDeliveriesId,
      },
    };

    const [deliveries, _] = await GetOrdersService.run(query, 1, conditions);

    const deliveriesWithProblems = deliveries.map(delivery => {
      const {
        id,
        product,
        canceled_at,
        start_date,
        end_date,
        recipient,
        deliverer,
        signature,
      } = delivery;

      const deliveryProblems = problems
        .filter(problem => problem.delivery_id === id)
        .map(problem => ({
          id: problem._id,
          delivery_id: problem.delivery_id,
          description: problem.description,
        })
      );

      return {
        id,
        product,
        canceled_at,
        start_date,
        end_date,
        recipient,
        deliverer,
        signature,
        problems: deliveryProblems
      }
    });

    return res.header('X-Total-Count', String(totalCount)).json(deliveriesWithProblems);
  }
}

export default new DeliveryProblemController();

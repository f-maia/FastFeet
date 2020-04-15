import { Request, Response } from 'express';

import DeliveryProblem from '../schemas/DeliveryProblem';
import Order from '../models/Order';

class ProblemController {
  async index(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);
    const { page } = req.query;

    let limit = null;
    let offset = 0;
    if (page) {
      limit = 6;
      offset = (page - 1) * limit;
    }

    const totalCount = await DeliveryProblem.count({
      delivery_id: id,
    });

    const problems = await DeliveryProblem.find({
      delivery_id: id,
    })
      .limit(limit)
      .skip(offset)
      .sort({ updated_at: -1 });

    return res.header('X-Total-Count', String(totalCount)).json(problems);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    const problem = await DeliveryProblem.create({
      delivery_id: order.id,
      description: req.body.description,
    });

    return res.json(problem);
  }
}

export default new ProblemController();

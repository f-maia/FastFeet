import { Request, Response } from 'express';
import { Op } from 'sequelize';

import Queue from '../../lib/Queue';

import OrderAssignmentMail from '../jobs/OrderAssignmentMail';

import GetOrdersService from '../services/GetOrdersService';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';
import DeliveryProblem from '../schemas/DeliveryProblem';

class OrderController {
  async index(req: Request, res: Response): Promise<Response> {
    const { q, page, problems = false } = req.query;
    const query = q || '';

    let condition: { id: {} };
    if(!!problems){
      const uniqueOrdersWithProblemsId = await DeliveryProblem.find().distinct("delivery_id");

      condition = {
      id:  {
          [Op.in]: uniqueOrdersWithProblemsId
        }
      }
    }

    console.log(req.query);
    const [orders, totalCount] = await GetOrdersService.run(query, page, condition);

    return res.header('X-Total-Count', String(totalCount)).json(orders);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { recipient_id, deliveryman_id, product } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const deliverer = await Deliverer.findByPk(deliveryman_id);
    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer not found.' });
    }

    const order = await Order.create({
      recipient_id,
      deliveryman_id,
      product,
    });

    await Queue.add(OrderAssignmentMail.key, { order, recipient, deliverer });

    return res.json(order);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { recipient_id, deliveryman_id } = req.body;
    const { id } = req.params;

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const deliverer = await Deliverer.findByPk(deliveryman_id);
    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer not found.' });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    const orderUpdated = await order.update(req.body);

    return res.json(orderUpdated);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    await order.destroy();
    await DeliveryProblem.deleteMany({ delivery_id: order.id });


    return res.json(order);
  }
}

export default new OrderController();

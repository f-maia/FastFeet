import { Request, Response } from 'express';
import { getHours, startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';

import FormatDate from '../Utils/FormatDate';

class DeliveryStartController {
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { start_date } = req.body;

    const date = FormatDate(start_date);

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    const hours = getHours(parseISO(date));
    if (hours >= 18 || hours < 8) {
      return res.status(400).json({
        error: "It's only possible to start a delivery between 8am and 6pm.",
      });
    }

    const conditions = {
      deliveryman_id: order.deliveryman_id,
      start_date: {
        [Op.between]: [startOfDay(parseISO(date)), endOfDay(parseISO(date))],
      },
    };

    const ordersWithdrawn = await Order.count({ where: conditions });
    if (ordersWithdrawn >= 5) {
      return res.status(400).json({
        error: 'This deliverer already maxed out his orders withdraws today.',
      });
    }

    const orderUpdated = await order.update({
      start_date: date,
    });

    return res.json(orderUpdated);
  }
}

export default new DeliveryStartController();

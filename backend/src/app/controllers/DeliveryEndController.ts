import { Request, Response } from 'express';

import Queue from '../../lib/Queue';

import OrderCancelationMail from '../jobs/OrderCancellationMail';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';
import File from '../models/File';

class DeliveryEndController {
  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'File not provided.' });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    const orderUpdated = await order.update({
      signature_id: file.id,
      end_date: new Date(),
    });

    return res.json(orderUpdated);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(400).json({ error: 'Order not found.' });
    }

    if (order.end_date) {
      return res.status(400).json({ error: 'Order already delivered' });
    }

    const { recipient_id, deliveryman_id } = order;

    const recipient = await Recipient.findByPk(recipient_id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const deliverer = await Deliverer.findByPk(deliveryman_id);
    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer not found.' });
    }

    const date = new Date();
    const orderUpdated = await order.update({
      canceled_at: date,
      end_date: date,
    });

    await Queue.add(OrderCancelationMail.key, { order, recipient, deliverer });

    return res.json(orderUpdated);
  }
}

export default new DeliveryEndController();

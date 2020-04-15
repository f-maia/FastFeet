import { Request, Response } from 'express';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req: Request, res: Response): Promise<Response> {
    const { q, page } = req.query;
    const query = q || '';

    let limit = null;
    let offset = 0;
    if (page) {
      limit = 6;
      offset = (page - 1) * limit;
    }

    const totalCount = await Recipient.count({
      where: { name: { [Op.like]: `%${query}%` } },
    });

    const recipients = await Recipient.findAll({
      where: { name: { [Op.like]: `%${query}%` } },
      limit,
      offset,
      order: [['updated_at', 'DESC']],
      attributes: [
        'id',
        'name',
        'street',
        'address_details',
        'number',
        'state',
        'city',
        'zip_code',
      ],
    });

    return res.header('X-Total-Count', String(totalCount)).json(recipients);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { address_details, ...recipient } = req.body;

    const recipientExists = await Recipient.findOne({
      where: recipient,
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists.' });
    }

    const { id } = await Recipient.create({
      ...req.body,
      address_details: address_details || '',
    });

    return res.json({ id, ...recipient, address_details });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    await recipient.update(req.body);

    return res.json({ id, ...req.body });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);
    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    await recipient.destroy();

    return res.json(recipient);
  }
}

export default new RecipientController();

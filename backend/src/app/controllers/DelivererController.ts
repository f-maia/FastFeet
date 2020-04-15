import { Request, Response } from 'express';
import { Op } from 'sequelize';

import Deliverer from '../models/Deliverer';
import File from '../models/File';

class DelivererController {
  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deliverer = await Deliverer.findByPk(id, {
      attributes: ['id', 'name', 'email', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliverer);
  }

  async index(req: Request, res: Response): Promise<Response> {
    const { q, page } = req.query;
    const query = q || '';

    let limit = null;
    let offset = 0;
    if (page) {
      limit = 6;
      offset = (page - 1) * limit;
    }

    const totalCount = await Deliverer.count({
      where: { name: { [Op.like]: `%${query}%` } },
    });

    const deliverers = await Deliverer.findAll({
      where: { name: { [Op.like]: `%${query}%` } },
      limit,
      offset,
      order: [['updated_at', 'DESC']],
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.header('X-Total-Count', String(totalCount)).json(deliverers);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const delivererExists = await Deliverer.findOne({
      where: { email: req.body.email },
    });

    if (delivererExists) {
      return res.status(400).json({
        error: 'Deliverer already exists. Verify the email field.',
      });
    }

    const deliverer = await Deliverer.create(req.body);

    return res.json(deliverer);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const deliverer = await Deliverer.findByPk(req.params.id);
    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer not found.' });
    }

    if (email && email !== deliverer.email) {
      const userExists = await Deliverer.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({
          error: 'Deliverer already exists.',
        });
      }
    }

    const delivererUpdated = await deliverer.update(req.body);

    return res.json(delivererUpdated);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const deliverer = await Deliverer.findByPk(req.params.id);

    if (!deliverer) {
      return res.status(400).json({ error: 'Deliverer not found.' });
    }

    await deliverer.destroy();

    return res.json(deliverer);
  }
}

export default new DelivererController();

import { Op, WhereOptions } from 'sequelize';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';
import File from '../models/File';

class GetOrdersService {
  async run(query: string,  page: number, extraConditions?: WhereOptions): Promise<(Order[]|String)[]> {
    const initialConditions: WhereOptions = {
      product: { [Op.like]: `%${query}%` },
    };

    const conditions = extraConditions
      ? { ...initialConditions, ...extraConditions }
      : initialConditions;

    const total: String = await Order.count({
      where: conditions
    });

    let limit = null;
    let offset = 0;
    if(page){
      limit = 6;
      offset = (page - 1) * limit;
    }


    const orders: Order[] = await Order.findAll({
      where: conditions,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      limit,
      offset,
      order: [
        ['updated_at', 'DESC']
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
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
        },
        {
          model: Deliverer,
          as: 'deliverer',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return [orders, total];
  }
}

export default new GetOrdersService();

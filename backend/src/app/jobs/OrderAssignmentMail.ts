import Mail from '../../lib/Mail';

import Order from '../interfaces/Order';
import Recipient from '../interfaces/Recipient';
import Deliverer from '../interfaces/Deliverer';

interface Params {
  order: Order;
  recipient: Recipient;
  deliverer: Deliverer;
}

class OrderAssignmentMail {
  get key(): string {
    return 'OrderAssignmentMail';
  }

  async handle({ data }): Promise<void> {
    const { order, recipient, deliverer }: Params = data;

    const complement =
      recipient.address_details || 'Não há complemento para esse endereço';

    await Mail.sendMail({
      to: `${deliverer.name} <${deliverer.email}>`,
      subject: 'Nova encomenda aguardando retirada',
      template: 'orderAssignment',
      context: {
        deliverer_name: deliverer.name,
        order_id: order.id,
        order_name: order.product,
        recipient_name: recipient.name,
        recipient_city: recipient.city,
        recipient_state: recipient.state,
        recipient_street: recipient.street,
        recipient_number: recipient.number,
        recipient_addressDetails: complement,
      },
    });
  }
}

export default new OrderAssignmentMail();

import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

import ValidateDeliveryUpdate from '../Utils/ValidateDeliveryUpdate';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const schema = Yup.object().shape({
      recipient_id: Yup.number()
        .integer()
        .positive()
        .required(),
      deliveryman_id: Yup.number()
        .integer()
        .positive()
        .required(),
      signature_id: Yup.number()
        .integer()
        .positive(),
      product: Yup.string().required(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    await schema.isValid(req.body, { abortEarly: false });

    const { start_date, canceled_at, signature_id, end_date } = req.body;

    const validateDeliveryEnd = ValidateDeliveryUpdate({
      canceled_at,
      signature_id,
      end_date,
      start_date,
    });

    if (validateDeliveryEnd) {
      throw new Error();
    }

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};

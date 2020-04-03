import { Request, Response, NextFunction } from 'express';
import * as Yup from 'yup';

export default async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      address_details: Yup.string(),
      number: Yup.number()
        .integer()
        .positive(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string()
        .length(8)
        .matches(/^[0-9]{8}$/, 'Must be exactly 8 digits')
    });

    await schema.isValid(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};

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
      avatar_id: Yup.number()
        .integer()
        .positive(),
      email: Yup.string().email(),
    });

    await schema.isValid(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: 'Validation fails.', messages: err.inner });
  }
};

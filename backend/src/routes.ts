import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import auth from './app/middlewares/auth';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DelivererController from './app/controllers/DelivererController';
import OrderController from './app/controllers/OrderController';
import DeliveriesController from './app/controllers/DeliveriesController';
import DeliveryStartController from './app/controllers/DeliveryStartController';
import DeliveryEndController from './app/controllers/DeliveryEndController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemController from './app/controllers/ProblemController';

import validateSessionStore from './app/validators/SessionStore';
import validateRecipientStore from './app/validators/RecipientStore';
import validateRecipientUpdate from './app/validators/RecipientUpdate';
import validateDelivererStore from './app/validators/DelivererStore';
import validateDelivererUpdate from './app/validators/DelivererUpdate';
import validateOrderStore from './app/validators/OrderStore';
import validateOrderUpdate from './app/validators/OrderUpdate';
import validateDeliveryStartUpdate from './app/validators/DeliveryStartUpdate';
import validateDeliveryEndUpdate from './app/validators/DeliveryEndUpdate';
import validateProblemStore from './app/validators/ProblemStore';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.json({ message: 'OK' });
});

routes.get('/deliveryman/:id/deliveries', DeliveriesController.index);

routes.get('/delivery/:id/problems', ProblemController.index);
routes.post(
  '/delivery/:id/problems',
  validateProblemStore,
  ProblemController.store
);

routes.put(
  '/delivery/:id/start',
  validateDeliveryStartUpdate,
  DeliveryStartController.update
);
routes.put(
  '/delivery/:id/end',
  validateDeliveryEndUpdate,
  upload.single('file'),
  DeliveryEndController.update
);

routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(auth);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  validateRecipientUpdate,
  RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.delete);


routes.get('/deliverers', DelivererController.index);
routes.post('/deliverers', validateDelivererStore, DelivererController.store);
routes.put(
  '/deliverers/:id',
  validateDelivererUpdate,
  DelivererController.update
);
routes.delete('/deliverers/:id', DelivererController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', validateOrderStore, OrderController.store);
routes.put('/orders/:id', validateOrderUpdate, OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

routes.get('/deliveries/problems', DeliveryProblemController.index);

routes.delete('/problem/:id/cancel-delivery', DeliveryEndController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;

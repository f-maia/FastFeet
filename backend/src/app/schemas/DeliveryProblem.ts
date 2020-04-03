import { Schema, model, Document } from 'mongoose';

interface DeliveryProblem extends Document {
  delivery_id: number;
  description: string;
}

const DeliveryProblemSchema = new Schema(
  {
    delivery_id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<DeliveryProblem>(
  'delivery-problems',
  DeliveryProblemSchema
);

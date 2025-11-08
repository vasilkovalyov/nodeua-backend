import { Schema, model, Types } from "mongoose";
import { DB_MODEL_NAME } from "../../constants/model-names";
import { BuyedNodeDBModelType } from "./buyed-node-model.type";

export const BuyedNodeSchema = new Schema<BuyedNodeDBModelType>({
  count: { type: Number, required: true },
  expiration_date: { type: Date, required: true },
  purchase_date: { type: Date, required: true },
  node: { type: Types.ObjectId, ref: DB_MODEL_NAME.node, required: true },
  user: { type: Types.ObjectId, ref: DB_MODEL_NAME.user, required: true }
});

export default model<BuyedNodeDBModelType>(DB_MODEL_NAME.buyedNode, BuyedNodeSchema);

import { Schema, model, Types } from "mongoose";
import { DB_MODEL_NAME } from "../../constants/model-names";
import { NodeDBModelType } from "./node-model-type";

export const NodeSchema = new Schema<NodeDBModelType>(
  {
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number },
    guide: { type: Boolean },
    is_reneweble: { type: Boolean, default: true },
    is_expired: { type: Boolean, default: false },
    max_duration_months: { type: Number },
    max_duration_days: { type: Number },
    ip_node: { type: String },
    id_node: { type: String },
    key_node: { type: String },
    expiration_date: { type: Date },
    description: {
      type: Types.ObjectId,
      ref: DB_MODEL_NAME.nodeDescription
    }
  },
  {
    timestamps: true
  }
);

export default model<NodeDBModelType>(DB_MODEL_NAME.node, NodeSchema);

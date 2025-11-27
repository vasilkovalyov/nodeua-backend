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
    is_active: { type: Boolean, default: false },
    max_duration_months: { type: Number },
    ip_node: { type: String },
    id_node: { type: String },
    key_node: { type: String },
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

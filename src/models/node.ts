import { Schema, model, Document, Types } from "mongoose";
import { NodeType } from "types/node";

export type ServiceNodeDBModelType = {
  description: Types.ObjectId | ServiceNodeDBModelType;
} & Document &
  NodeType;

export const NodeSchema = new Schema<ServiceNodeDBModelType>(
  {
    name: { type: String, required: true },
    image: { type: String },
    price: { type: Number },
    link: { type: String },
    is_active: { type: Boolean },
    guide: { type: Boolean },
    is_reneweble: { type: Boolean },
    is_soldout: { type: Boolean },
    max_duration: { type: Number },
    ip_node: { type: String },
    description: {
      type: Schema.Types.ObjectId,
      ref: "NodeDescription",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Node = model("Node", NodeSchema);

export default Node;

import { Schema, model } from "mongoose";
import { DB_MODEL_NAME } from "../../constants/model-names";
import { NodeDescriptionDBModelType } from "./node-description-model-type";

export const NodeDescriptionSchema = new Schema<NodeDescriptionDBModelType>(
  {
    description: { type: String },
    short_description: { type: String },
    type: { type: String },
    site_link: { type: String },
    twitter_link: { type: String },
    github_link: { type: String },
    telegram_link: { type: String },
    guide_link: { type: String }
  },
  {
    timestamps: true
  }
);

export default model<NodeDescriptionDBModelType>(DB_MODEL_NAME.nodeDescription, NodeDescriptionSchema);

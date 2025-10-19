import { Schema, model, Document } from "mongoose";
import { NodeDescriptionType } from "types/node";

export type ServiceNodeDescriptionDBModelType = Document & NodeDescriptionType;

export const NodeDescriptionSchema = new Schema<ServiceNodeDescriptionDBModelType>(
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

export const NodeDescription = model("NodeDescription", NodeDescriptionSchema);

export default NodeDescription;

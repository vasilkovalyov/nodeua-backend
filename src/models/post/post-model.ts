import { DB_MODEL_NAME } from "../../constants/model-names";
import { Schema, model } from "mongoose";
import { PostDBModelType } from "./post-model-type";

export const PostSchema = new Schema<PostDBModelType>(
  {
    heading: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    short_description: { type: String },
    rich_text: { type: String },
    image: { type: String },
    seo_description: { type: String },
    seo_keywords: { type: String }
  },
  {
    timestamps: true
  }
);

export default model(DB_MODEL_NAME.post, PostSchema);

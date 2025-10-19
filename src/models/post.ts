import { Schema, model, Document } from "mongoose";

export interface PostType extends Document {
  id: string;
  heading: string;
  slug: string;
  short_description: string;
  rich_text: string;
  createdAt: Date;
  image?: string;
  seo_description?: string;
  seo_keywords?: string;
}

export const PostSchema = new Schema<PostType>(
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

export const Post = model("Post", PostSchema);

export default Post;

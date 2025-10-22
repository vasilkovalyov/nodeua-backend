import { Document } from "mongoose";

export type PostType = {
  id: string;
  heading: string;
  slug: string;
  short_description: string;
  rich_text: string;
  createdAt: Date;
  image?: string;
  seo_description?: string;
  seo_keywords?: string;
};

export type PostDBModelType = Document & PostType;

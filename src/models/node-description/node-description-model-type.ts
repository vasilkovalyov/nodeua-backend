import { Document } from "mongoose";

export type NodeDescriptionType = {
  description: string;
  short_description: string;
  type: string;
  site_link: string;
  twitter_link: string;
  github_link: string;
  telegram_link: string;
  guide_link: string;
};

export type NodeDescriptionDBModelType = Document & NodeDescriptionType;

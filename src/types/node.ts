export type NodeType = {
  _id: string;
  name: string;
  image: string;
  installation_price: number;
  price_per_month: number;
  link: string;
  is_active: boolean;
  is_tba: boolean;
  is_soldout: boolean;
  with_keys_only: boolean;
  with_new_only: boolean;
  guide: boolean;
  max_duration: number;
  is_reneweble: boolean;
  priority: number;
  discount_percentage: number;
  is_node_of_the_week: boolean;
  is_new: boolean;
  linkKeys: string;
};

export type NodeDescriptionType = {
  description: string;
  short_description: string;
  type: string;
  roadmap: string;
  fundsraised: string;
  site_link: string;
  twitter_link: string;
  github_link: string;
  discord_link: string;
  telegram_link: string;
  guide_link: string;
};

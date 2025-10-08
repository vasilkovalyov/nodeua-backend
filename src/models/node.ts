export type ServiceNodeType = {
  _id: string;
  name: string;
  image: string;
  installation_price: number;
  price_per_month: number;
  link: string;
  is_active: boolean;
  is_tba: boolean;
  with_keys_only: boolean;
  with_new_only: boolean;
  guide: boolean;
  is_reneweble: boolean;
  is_soldout: boolean;
  max_duration: number;
  discount_percentage: number;
  is_node_of_the_week: boolean;
};

export type ServiceNodeDescriptionType = {
  _id: string;
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

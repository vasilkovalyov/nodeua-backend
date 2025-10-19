import { CreateNodeProps, NodeDescriptionType } from "../types/node";

export function adaperNodeToNodeModel(params: CreateNodeProps) {
  return {
    name: params.name,
    image: params.image,
    price: params.price,
    link: params.link,
    is_active: params.is_active,
    guide: params.guide,
    is_reneweble: params.is_reneweble,
    is_soldout: params.is_soldout,
    max_duration: params.max_duration,
    ip_node: params.ip_node
  };
}

export function adaperNodeToNodeDescriptionModel(params: CreateNodeProps): NodeDescriptionType {
  return {
    description: params.description,
    short_description: params.short_description,
    type: params.type,
    site_link: params.site_link,
    twitter_link: params.twitter_link,
    github_link: params.github_link,
    telegram_link: params.telegram_link,
    guide_link: params.guide_link
  };
}

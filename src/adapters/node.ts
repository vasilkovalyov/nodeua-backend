import { CreateNodeProps, NodeType } from "../models/node/node-model-type";
import { NodeDescriptionType } from "../models/node-description/node-description-model-type";

export function adaperNodeToNodeModel(params: CreateNodeProps): Omit<NodeType, "_id"> {
  return {
    name: params.name,
    image: params.image,
    price: params.price,
    guide: params.guide,
    is_reneweble: params.is_reneweble,
    is_active: false,
    max_duration_months: params.max_duration_months,
    ip_node: params.ip_node,
    id_node: params.id_node,
    key_node: params.key_node
  };
}

export function adaperNodeToNodeDescriptionModel(params: CreateNodeProps): NodeDescriptionType {
  return {
    description: params.description,
    type: params.type,
    site_link: params.site_link,
    twitter_link: params.twitter_link,
    github_link: params.github_link,
    telegram_link: params.telegram_link,
    guide_link: params.guide_link
  };
}

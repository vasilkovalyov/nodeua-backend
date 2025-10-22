import { CreateNodeProps } from "models/node/node-model-type";
import { getDaysCountBetweenDates } from "../utils/dates";
import { NodeDescriptionType } from "../models/node-description/node-description-model-type";

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
    max_duration_months: params.max_duration_months,
    max_duration_days: getDaysCountBetweenDates(new Date(), new Date(params.end_date)),
    ip_node: params.ip_node,
    id_node: params.id_node,
    key_node: params.key_node,
    end_date: params.end_date
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

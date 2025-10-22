import { Types, Document } from "mongoose";

import { NodeDescriptionDBModelType, NodeDescriptionType } from "../node-description/node-description-model-type";

export type NodeType = {
  _id: string;
  name: string;
  image: string;
  price: number;
  link: string;
  is_active: boolean;
  guide: boolean;
  is_reneweble: boolean;
  is_soldout: boolean;
  max_duration_months: number;
  max_duration_days: number;
  ip_node: string;
  id_node: string;
  key_node: string;
  end_date: Date;
};

export type NodeDBModelType = Document &
  NodeType & {
    description: string | Types.ObjectId | NodeDescriptionDBModelType;
  };

export type CreateNodeProps = Omit<NodeType, "_id"> & NodeDescriptionType;
export type UpdateNodeProps = NodeType & NodeDescriptionType;

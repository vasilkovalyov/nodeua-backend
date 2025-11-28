import { Types, Document } from "mongoose";

import { NodeDescriptionDBModelType, NodeDescriptionType } from "../node-description/node-description-model-type";

export type NodeType = {
  _id: string;
  name: string;
  image: string;
  price: number;
  guide: boolean;
  is_reneweble: boolean;
  is_active: boolean;
  max_duration_months: number;
  ip_node: string;
  id_node: string;
  key_node: string;
};

export type NodeDBModelType = Document &
  NodeType & {
    description: string | Types.ObjectId | NodeDescriptionDBModelType;
  };

export type CreateNodeProps = Omit<NodeType, "_id"> & NodeDescriptionType;
export type UpdateNodeProps = NodeType & NodeDescriptionType;

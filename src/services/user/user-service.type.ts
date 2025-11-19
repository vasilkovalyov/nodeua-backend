import { NodeType } from "../../models/node/node-model-type";

export type GetBuyedNodesInfoFromDBProps = {
  _id: string;
  expiration_date: string;
  node: Pick<NodeType, "_id" | "image" | "name" | "price" | "ip_node" | "id_node" | "key_node" | "expiration_date">;
};

export type UserBuyedNodeType = Pick<NodeType, "_id" | "name" | "image" | "price" | "id_node" | "key_node">;

import BuyedNodeModel from "../../models/buyed-node/buyed-node-model";
import { NodePaymentCartType } from "../../types/node";
import { NodeDBModelType } from "../../models/node/node-model-type";

export function getTotalAmountNodes(nodesModelFromDb: NodeDBModelType[], nodesPayload: NodePaymentCartType[]): number {
  const nodesMap: Map<string, Omit<NodePaymentCartType, "_id">> = new Map();

  nodesPayload.forEach((node) => {
    const { _id, ...props } = node;
    nodesMap.set(_id, props);
  });

  return nodesModelFromDb.reduce((total, node) => {
    const currentNode = nodesMap.get(node._id.toString());
    let result = 0;

    if (currentNode) {
      result = node.price * (currentNode.quantity * currentNode.months);
    }
    return total + result;
  }, 0);
}

export function getNodeById(nodes: NodePaymentCartType[], id: string): NodePaymentCartType {
  const node = nodes.filter((node) => {
    return node._id === id;
  })[0];
  return node;
}

export function calculateExpirationDateFromNodeCart(months: number, today: Date): Date {
  const monthsLater = new Date(today);
  monthsLater.setMonth(today.getMonth() + months);

  return monthsLater;
}

export async function getBuyedNodesInfo(userId: string): Promise<Map<string, string>> {
  const buyedNodes = await BuyedNodeModel.find({
    user: userId
  }).select("node expiration_date");
  const nodesCollection = new Map();

  for (const node of buyedNodes) {
    nodesCollection.set(node.node.toString(), node.expiration_date);
  }

  return nodesCollection;
}

type UserBuyedNodeType = {
  _id: string;
  name: string;
  image: string;
  price: number;
  id_node: string;
  key_node: string;
};

export async function getBuyedUserNodes(
  userId: string,
  nodesIds: string[],
  date: Date,
  type: "active" | "inactive"
): Promise<UserBuyedNodeType[]> {
  const activeNodes = await BuyedNodeModel.find({
    user: userId,
    node: { $in: nodesIds },
    expiration_date: { [type === "active" ? "$gte" : "$lt"]: date }
  })
    .populate<{ node: NodeDBModelType }>("node")
    .select("_id name image price id_node key_node")
    .lean<{ node: NodeDBModelType }[]>();

  return activeNodes.map<UserBuyedNodeType>(({ node }) => {
    return {
      _id: node._id,
      name: node.name,
      image: node.image,
      price: node.price,
      id_node: node.id_node,
      key_node: node.key_node
    };
  });
}

import BuyedNodeModel from "../../models/buyed-node/buyed-node-model";
import { NodePaymentCartType } from "../../types/node";
import { NodeDBModelType } from "../../models/node/node-model-type";
import { GetBuyedNodesInfoFromDBProps } from "./user-service.type";

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

export async function getBuyedNodesInfo(
  userId: string,
  date: Date,
  type: "active" | "inactive"
): Promise<GetBuyedNodesInfoFromDBProps[]> {
  const buyedNodes = await BuyedNodeModel.find<GetBuyedNodesInfoFromDBProps>({
    user: userId,
    expiration_date: { [type === "active" ? "$gte" : "$lt"]: date }
  })
    .select("node user expiration_date")
    .populate([{ path: "node", select: "_id image name price ip_node id_node key_node expiration_date" }]);

  return buyedNodes;
}

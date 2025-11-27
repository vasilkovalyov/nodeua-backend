import NodeModel from "../../models/node/node-model";
import { NodeType } from "../../models/node/node-model-type";

export async function getAllNodesService() {
  const activeNodes = await NodeModel.find({ is_active: true }).lean();
  const expiredNodes = await NodeModel.find({ is_active: false }).lean();

  return {
    active: activeNodes,
    expired: expiredNodes
  };
}

export async function getNodesForCart(ids: string[]) {
  const nodes: NodeType[] = await NodeModel.find({
    _id: { $in: ids }
  })
    .select("name price max_duration_months createdAt")
    .lean();

  return nodes;
}

export async function getNodeService(id: string) {
  const nodeResponse = await NodeModel.findById(id).populate("description");

  return nodeResponse;
}

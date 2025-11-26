import NodeModel from "../../models/node/node-model";
import { getNodeServicesFormatedMaxDuration } from "./node-service.helpers";
import { NodeType } from "../../models/node/node-model-type";

export async function getAllNodesService() {
  const now = new Date();
  const activeNodes = await NodeModel.find({ expiration_date: { $gte: now } }).lean();
  const expiredNodes = await NodeModel.find({ expiration_date: { $lt: now } }).lean();

  return {
    active: getNodeServicesFormatedMaxDuration(activeNodes),
    expired: getNodeServicesFormatedMaxDuration(
      expiredNodes.map((node) => {
        return {
          ...node,
          is_expired: true
        };
      })
    )
  };
}

export async function getNodesForCart(ids: string[]) {
  const nodes: NodeType[] = await NodeModel.find({
    _id: { $in: ids }
  })
    .select("name price max_duration_months max_duration_days expiration_date createdAt")
    .lean();

  return getNodeServicesFormatedMaxDuration(nodes);
}

export async function getNodeService(id: string) {
  const nodeResponse = await NodeModel.findById(id).populate("description");

  return nodeResponse;
}

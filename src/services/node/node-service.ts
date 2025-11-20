import NodeModel from "../../models/node/node-model";
import NodeDescriptionModel from "../../models/node-description/node-description-model";
import BuyedNodeModel from "../../models/buyed-node/buyed-node-model";
import { adaperNodeToNodeModel, adaperNodeToNodeDescriptionModel } from "../../adapters/node";
import { getNodeServicesFormatedMaxDuration } from "./node-service.helpers";
import { CreateNodeProps, NodeType, UpdateNodeProps } from "../../models/node/node-model-type";

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

export async function getAllNodesForAdminService() {
  const nodes = await NodeModel.find().lean();
  return nodes;
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

export async function getNodeForAdminService(id: string) {
  const nodeResponse = await NodeModel.findById(id).populate("description");

  return nodeResponse;
}

export async function createNodeService(node: CreateNodeProps) {
  const nodeDescriptionModel = await new NodeDescriptionModel(adaperNodeToNodeDescriptionModel(node));
  const nodeModel = await new NodeModel({
    ...adaperNodeToNodeModel(node),
    description: nodeDescriptionModel._id
  });

  await nodeDescriptionModel.save();
  const savedNode = await nodeModel.save();

  return {
    _id: savedNode._id
  };
}

export async function updateNodeService(node: UpdateNodeProps) {
  const { _id } = node;
  const baseNodeProps = adaperNodeToNodeModel(node);
  const descriptionNodeProps = adaperNodeToNodeDescriptionModel(node);

  const nodeModel = await NodeModel.findByIdAndUpdate(_id, baseNodeProps);

  if (nodeModel) {
    nodeModel?.save();
    const nodeDescriptionModel = await NodeDescriptionModel.findByIdAndUpdate(
      nodeModel.description,
      descriptionNodeProps
    );
    nodeDescriptionModel?.save();
  }

  return {
    message: "Node has been updates"
  };
}

export async function getBuyedNodesForAdminService() {
  const nodes = await BuyedNodeModel.find()
    .select("_id purchase_date expiration_date")
    .populate([{ path: "node", select: "_id image name price ip_node id_node key_node" }])
    .populate([{ path: "user", select: "_id email" }]);

  return {
    nodes: nodes
  };
}

export async function getBuyedNodeForAdminService(id: string) {
  const node = await BuyedNodeModel.findById(id)
    .populate([{ path: "node" }])
    .populate([{ path: "user", select: "_id email" }]);

  return {
    node: node
  };
}

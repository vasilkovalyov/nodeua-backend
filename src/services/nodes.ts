import { CreateNodeProps, UpdateNodeProps } from "../types/node";
import NodeModel from "../models/node";
import NodeDescriptionModel from "../models/node-description";
import { adaperNodeToNodeModel, adaperNodeToNodeDescriptionModel } from "../adapters/node";

export async function getAllNodesService() {
  const isActiveNodes = await NodeModel.find({ is_active: true, is_soldout: false });
  const isSoldoutNodes = await NodeModel.find({ is_soldout: true });

  return {
    active: isActiveNodes,
    soldout: isSoldoutNodes
  };
}

export async function getNodesForCart(ids: string[]) {
  const nodes = await NodeModel.find({
    _id: { $in: ids }
  }).select("name price max_duration");

  return nodes;
}

export async function getNodeService(id: string) {
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
  await nodeModel.save();

  return {
    message: "Node has been created",
    nodeId: nodeModel._id
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

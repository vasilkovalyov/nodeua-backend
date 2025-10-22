import NodeModel from "../../models/node/node-model";
import NodeDescriptionModel from "../../models/node-description/node-description-model";
import { adaperNodeToNodeModel, adaperNodeToNodeDescriptionModel } from "../../adapters/node";
import { getNodeServicesFormatedMaxDuration } from "./node-service.helpers";
import { CreateNodeProps, NodeType, UpdateNodeProps } from "../../models/node/node-model-type";

export async function getAllNodesService() {
  const isActiveNodes = await NodeModel.find({ is_active: true, is_soldout: false }).lean();
  const isSoldoutNodes = await NodeModel.find({ is_soldout: true }).lean();

  return {
    active: getNodeServicesFormatedMaxDuration(isActiveNodes),
    soldout: getNodeServicesFormatedMaxDuration(isSoldoutNodes)
  };
}

export async function getNodesForCart(ids: string[]) {
  const nodes: NodeType[] = await NodeModel.find({
    _id: { $in: ids }
  })
    .select("name price max_duration_months max_duration_days end_date createdAt")
    .lean();

  return getNodeServicesFormatedMaxDuration(nodes);
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
    node_id: nodeModel._id
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

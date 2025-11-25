import NodeModel from "../../models/node/node-model";
import NodeDescriptionModel from "../../models/node-description/node-description-model";
import BuyedNodeModel from "../../models/buyed-node/buyed-node-model";
import { adaperNodeToNodeModel, adaperNodeToNodeDescriptionModel } from "../../adapters/node";
import { getNodeServicesFormatedMaxDuration } from "./node-service.helpers";
import { CreateNodeProps, NodeType, UpdateNodeProps } from "../../models/node/node-model-type";
import { DB_MODEL_NAME } from "../../constants/model-names";

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
  const now = new Date();

  const nodes = await BuyedNodeModel.aggregate([
    {
      $lookup: {
        from: "nodes",
        localField: "node",
        foreignField: "_id",
        as: DB_MODEL_NAME.node
      }
    },
    { $unwind: { path: `$${DB_MODEL_NAME.node}`, preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: DB_MODEL_NAME.user
      }
    },
    { $unwind: { path: `$${DB_MODEL_NAME.user}`, preserveNullAndEmptyArrays: true } },
    {
      $addFields: {
        is_active: { $gt: ["$expiration_date", now] }
      }
    },
    {
      $project: {
        [`${DB_MODEL_NAME.user}._id`]: 1,
        [`${DB_MODEL_NAME.user}.email`]: 1,
        [`${DB_MODEL_NAME.node}._id`]: 1,
        [`${DB_MODEL_NAME.node}.image`]: 1,
        [`${DB_MODEL_NAME.node}.name`]: 1,
        [`${DB_MODEL_NAME.node}.price`]: 1,
        [`${DB_MODEL_NAME.node}.ip_node`]: 1,
        [`${DB_MODEL_NAME.node}.id_node`]: 1,
        [`${DB_MODEL_NAME.node}.key_node`]: 1,
        _id: 1,
        purchase_date: 1,
        expiration_date: 1,
        is_active: 1
      }
    }
  ]);

  return {
    nodes: nodes
  };
}

export async function getBuyedNodeForAdminService(id: string) {
  const now = new Date();

  const node = await BuyedNodeModel.findById(id)
    .populate([{ path: "node" }])
    .populate([{ path: "user", select: "_id email" }])
    .lean();

  if (!node) {
    return {
      message: "node not found"
    };
  }

  return {
    node: {
      ...node,
      is_active: node.expiration_date > now
    }
  };
}

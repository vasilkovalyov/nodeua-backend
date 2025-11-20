import bcrypt from "bcrypt";

import { AuthMessages } from "../../constants/response-messages";
import UserModel from "../../models/user/user-model";
import NodeModel from "../../models/node/node-model";
import BuyedNodeModel from "../../models/buyed-node/buyed-node-model";
import { NodePaymentCartType } from "../../types/node";
import ApiError from "../api-error";
import {
  calculateExpirationDateFromNodeCart,
  getBuyedNodesInfo,
  getNodeById,
  getTotalAmountNodes
} from "./user-service.helpers";

export async function buyNodeService(userId: string, nodes: NodePaymentCartType[]) {
  const nodeIds = nodes.map((node) => node._id);

  const nodesModel = (await NodeModel.find({ _id: { $in: nodeIds } })).flat();
  if (!nodesModel) throw ApiError.BadRequestError(AuthMessages.nodeNotFound);

  const userModel = await UserModel.findById(userId);
  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userNotFound);

  const totalNodesAmount = getTotalAmountNodes(nodesModel, nodes);

  if (userModel.balance && userModel.balance < totalNodesAmount) {
    throw ApiError.BadRequestError("User does`t have enought money");
  }

  const now = new Date();

  nodesModel.forEach(async (node) => {
    const nodeId = node._id;
    const findNode = getNodeById(nodes, nodeId.toString());

    Array.from(Array(findNode.quantity).keys()).forEach(async () => {
      const buyedNodeModel = await new BuyedNodeModel({
        count: findNode.quantity,
        expiration_date: calculateExpirationDateFromNodeCart(findNode.months, now),
        purchase_date: now,
        node: nodeId,
        user: userModel._id
      });

      buyedNodeModel.user = userModel._id;
      await buyedNodeModel.save();
    });
  });

  if (userModel.balance !== undefined) {
    userModel.balance -= totalNodesAmount;
  }

  await userModel.save();

  return {
    balance: nodes
  };
}

export async function getActiveNodesService(userId: string) {
  const now = new Date();
  const nodes = await getBuyedNodesInfo(userId, now, "active");

  if (!nodes.length) {
    return {
      nodes: []
    };
  }

  return {
    nodes: nodes
  };
}

export async function getExpiredNodesService(userId: string) {
  const now = new Date();
  const nodes = await getBuyedNodesInfo(userId, now, "inactive");

  if (!nodes.length) {
    return {
      nodes: []
    };
  }

  return {
    nodes: nodes
  };
}

export async function createSuperAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!(email && password)) {
    throw ApiError.BadRequestError(AuthMessages.noCredentials);
  }

  const existing = await UserModel.findOne({ email });
  if (existing) {
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const superAdmin = new UserModel({
    email,
    password: hashedPassword,
    role: "admin"
  });

  await superAdmin.save();
}

export async function getAllUsersForAdmin() {
  const users = await UserModel.find().select("email _id");

  if (!users.length) {
    return {
      users: []
    };
  }

  return {
    users: users
  };
}

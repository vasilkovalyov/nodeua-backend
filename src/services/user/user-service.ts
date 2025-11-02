import bcrypt from "bcrypt";

import { AuthMessages } from "../../constants/response-messages";
import UserModel from "../../models/user/user-model";
import NodeModel from "../../models/node/node-model";
import PaymentModel from "../../models/payment/payment-model";
import { NodePaymentCartType } from "../../types/node";
import ApiError from "../api-error";
import {
  calculateExpirationDateFromNodeCart,
  getPaymentInfo,
  getUserPayments,
  getNodeById,
  getTotalAmountNodes
} from "./user-service.helpers";

export async function topUpUserBalanceService(userId: string, amount: string) {
  const userModel = await UserModel.findById(userId);
  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userNotFound);

  if (userModel.balance !== undefined) {
    userModel.balance += parseFloat(amount);
  }

  await userModel.save();

  return {
    balance: userModel?.balance
  };
}

export async function paymentNodeService(userId: string, nodes: NodePaymentCartType[]) {
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

    const paymentModel = await new PaymentModel({
      count: findNode.quantity,
      expiration_date: calculateExpirationDateFromNodeCart(findNode.months, now),
      purchase_date: now,
      node: nodeId,
      user: userModel._id
    });

    paymentModel.user = userModel._id;
    await paymentModel.save();
  });

  if (userModel.balance !== undefined) {
    userModel.balance -= totalNodesAmount;
  }

  await userModel.save();

  return {
    balance: userModel.balance
  };
}

export async function getActiveNodesService(userId: string) {
  const now = new Date();
  const paymentsIds = await getPaymentInfo(userId);
  const activeNodes = await getUserPayments(userId, Array.from(paymentsIds.keys()), now, "active");

  if (!activeNodes.length) {
    return {
      nodes: []
    };
  }

  return {
    nodes: activeNodes.map((node) => {
      return {
        ...node,
        expiration_date: paymentsIds.get(node._id.toString())
      };
    })
  };
}

export async function getExpiredNodesService(userId: string) {
  const now = new Date();
  const paymentsIds = await getPaymentInfo(userId);
  const inactiveNodes = await getUserPayments(userId, Array.from(paymentsIds.keys()), now, "inactive");

  if (!inactiveNodes.length) {
    return {
      nodes: []
    };
  }

  return {
    nodes: inactiveNodes
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

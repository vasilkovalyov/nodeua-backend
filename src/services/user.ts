import { AuthMessages } from "../constants/response-messages";
import UserModel from "../models/user";
import ApiError from "./api-error";

export async function topUpUserBalanceService(userId: string, amount: string) {
  const userModel = await UserModel.findById(userId);
  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userNotFound);

  userModel.balance += parseFloat(amount);

  await userModel.save();

  return {
    balance: userModel?.balance
  };
}

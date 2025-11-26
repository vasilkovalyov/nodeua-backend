import bcrypt from "bcrypt";

import ApiError from "./api-error";
import UserModel from "../models/user/user-model";

import { generateTokens } from "./token/token-service";
import { AuthMessages } from "../constants/response-messages";
import { UserLoginParams, UserRegistrationParams } from "../models/user/user-model-type";

export async function loginService({ email, password }: UserLoginParams) {
  const userModel = await UserModel.findOne({
    email: email
  });

  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userLoginNotFound);

  const validPass = await bcrypt.compare(password, userModel.password);
  if (!validPass) throw ApiError.BadRequestError(AuthMessages.wrongPassword);

  const token = await generateTokens({
    _id: userModel?._id.toString(),
    isAdmin: userModel.role === "admin"
  });

  return {
    _id: userModel._id,
    email: userModel.email,
    accessToken: token.accessToken,
    refreshToken: token.refreshToken
  };
}

export async function registrationService({ email, password }: UserRegistrationParams) {
  const userExist = await UserModel.findOne({ email: email });
  if (userExist) throw ApiError.BadRequestError(AuthMessages.userExist);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await new UserModel({
    email: email,
    password: hashedPassword,
    balance: 0
  });

  await user.save();

  return {
    message: AuthMessages.userCreated
  };
}

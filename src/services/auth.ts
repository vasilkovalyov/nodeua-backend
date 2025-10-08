import ApiError from "./api-error";
import { UserModel } from "../models";

import bcrypt from "bcrypt";
import { generateTokens } from "./token";
import { AuthMessages } from "../constants/response-messages";
import { UserLoginType } from "../types/user";

export async function loginService({ email, password }: UserLoginType) {
  const userModel = await UserModel.findOne({
    email: email
  });

  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userLoginNotFound);

  const validPass = await bcrypt.compare(password, userModel.password);
  if (!validPass) throw ApiError.BadRequestError(AuthMessages.wrongPassword);

  const token = await generateTokens({
    _id: userModel?._id.toString()
  });
  return {
    _id: userModel._id,
    email: userModel.email,
    accessToken: token.accessToken,
    refreshToken: token.refreshToken
  };
}

export async function registrationService({ email, password }: UserLoginType) {
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

export async function profileService(id: string) {
  const response = await UserModel.findById(id);

  return response;
}

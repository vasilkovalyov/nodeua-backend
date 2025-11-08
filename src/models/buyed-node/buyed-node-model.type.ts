import { NodeDBModelType } from "../node/node-model-type";
import { UserDBModelType } from "../user/user-model-type";
import { Document, ObjectId } from "mongoose";

export type BuyedNodeDBModelType = {
  count: number;
  expiration_date: Date;
  purchase_date: Date;
  node: string | ObjectId | NodeDBModelType;
  user: string | ObjectId | UserDBModelType;
} & Document;

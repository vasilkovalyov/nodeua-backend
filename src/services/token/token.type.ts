export type TokenVerifyResponseType = {
  userId: string;
  iat: number;
  exp: number;
};

export type TokenType = "access" | "refresh";

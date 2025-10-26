export type TokenVerifyResponseType = {
  userId: string;
  iat: number;
  exp: number;
  isAdmin?: boolean;
};

export type TokenType = "access" | "refresh";

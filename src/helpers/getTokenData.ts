import { NextRequest } from "next/server";
const jwt = require("jsonwebtoken");

export const getTokenData = async (request: NextRequest) => {
  try {
    const enc_token = request.cookies.get("token")?.value || "";

    const dec_token: any = jwt.verify(enc_token, process.env.TOKEN_SECRET);

    console.log(dec_token);

    return dec_token.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
const bcryptjs = require("bcryptjs");

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { token, newPass } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error_message: "Invalid Token!" },
        { status: 400 }
      );
    }

    // if user validated then update password
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    // hash pass
    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(newPass, salt);

    // update DB
    user.password = hashPass;

    const savedUser = await user.save();

    console.log(savedUser);

    return NextResponse.json({
      message: "Password Update Success!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

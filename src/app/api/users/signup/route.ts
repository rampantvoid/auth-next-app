import connect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
const bcryptjs = require("bcryptjs");

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password, email } = reqBody;

    console.log(reqBody);

    // check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPass = await bcryptjs.hash(password, salt);

    // Cerating the user
    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    const savedUser = await newUser.save();

    console.log(savedUser);

    await sendEmail({ email, emailType: 0, userId: savedUser._id });

    return NextResponse.json({
      message: "User Created Successfully!",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

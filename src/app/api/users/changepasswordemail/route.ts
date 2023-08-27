import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error_message: "Please enter a valid email" },
        { status: 400 }
      );
    }

    await sendEmail({ email, emailType: 1, userId: user._id });

    return NextResponse.json({
      message: "Email Sent Successfully!",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

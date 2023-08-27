const nodemailer = require("nodemailer");
import User from "@/models/userModel";
const bcryptjs = require("bcryptjs");

enum emailType {
  VERIFY,
  RESET,
}

type updateReq = {
  email: String;
  emailType: emailType;
  userId: any;
};

export const sendEmail = async ({ email, emailType, userId }: updateReq) => {
  try {
    // create hashed token
    const hashed_token = await bcryptjs.hash(userId.toString(), 10);

    console.log(hashed_token);

    if (emailType === 0) {
      const user = await User.findByIdAndUpdate(userId, {
        verifyToken: hashed_token,
        verifyTokenExpiry: Date.now() + 3600000,
      });

      console.log(user.verifyToken);
    } else if (emailType === 1) {
      //for password change
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashed_token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // create transport for nodemailer
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "cb6b145f300a2d",
        pass: "93a7bc10ef5e65",
      },
    });

    const mailOptions = {
      from: "priyan@gmail.com",
      to: email,
      subject: emailType === 0 ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/setnewpassword?token=${hashed_token}"> here </a> to ${
        emailType === 0 ? "Verify your email" : "Reset your password"
      } </p>`,
    };
    console.log(mailOptions);

    const mailResponse = await transport.sendMail(
      mailOptions,
      (err: any, info: any) => {
        if (err) {
          console.log(err);
        }
        console.log(info.messageId);
      }
    );

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

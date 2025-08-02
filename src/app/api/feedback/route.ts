import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { feedback } = await request.json();

    if (!feedback?.trim()) {
      return NextResponse.json(
        { error: "Feedback content is required" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email without any identifying information
    await transporter.sendMail({
      from: `"Anonymous Feedback" <${process.env.EMAIL_USER}>`,
      to: process.env.FEEDBACK_RECEIVER_EMAIL,
      subject: "New Anonymous Feedback",
      text: feedback,
      html: `<div>${feedback.replace(/\n/g, "<br>")}</div>`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing anonymous feedback:", error);
    return NextResponse.json(
      { error: "Failed to process feedback" },
      { status: 500 },
    );
  }
}

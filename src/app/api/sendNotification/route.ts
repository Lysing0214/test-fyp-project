import { NextResponse } from "next/server";
import admin from "@/firebaseAdmin"; // Import Firebase Admin

export async function POST(req: Request) {
  try {
    const { token, title, body } = await req.json();

    if (!token || !title || !body) {
      return NextResponse.json(
        { error: "Missing token, title, or body" },
        { status: 400 }
      );
    }

    const message = {
      token,
      notification: {
        title,
        body,
      },
    };

    // Send notification using Firebase
    await admin.messaging().send(message);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 });
  }
}

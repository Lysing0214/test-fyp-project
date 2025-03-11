import admin from "firebase-admin";
// import { readFileSync } from "fs";
import dotenv from "dotenv";

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {

  // const serviceAccount = JSON.parse(
  //   readFileSync("service_key.json", "utf8")
  // );

  // Load environment variables from .env.local file
  dotenv.config();

  const serviceAccount = JSON.parse(process.env.SERVICE_KEY_JSON as string);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;

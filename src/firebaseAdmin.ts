import admin from "firebase-admin";
import { readFileSync } from "fs";

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(
    readFileSync("service_key.json", "utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;

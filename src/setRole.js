import admin from "firebase-admin";
import fs from "fs";
import path from "path";

const serviceAccountPath = path.resolve("./serviceAccount.json"); // root
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function setUserRole(uid, role) {
  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    console.log(`✅ Role "${role}" set for user UID: ${uid}`);
    process.exit(0);
  } catch (error) {
    console.error("Error setting role:", error);
    process.exit(1);
  }
}

const USER_UID = "9fbwCex9LWPv9SG7NAJ9eCqOMFU2";
const ROLE = "editor";

setUserRole(USER_UID, ROLE);
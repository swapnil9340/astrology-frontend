/**
 * Tiny JSON-file user store.
 * Zero-config and cross-platform — good enough to get auth working.
 * The rest of the app only talks to these functions, so this file is the
 * single place to swap in MongoDB / Postgres / Prisma later.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "..", "data");
const DB_FILE = path.join(DATA_DIR, "users.json");

let cache = null;
// Serialise writes so concurrent requests don't clobber the file.
let writeChain = Promise.resolve();

async function load() {
  if (cache) return cache;
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    cache = JSON.parse(raw);
  } catch {
    cache = { users: [], seq: 0 };
  }
  return cache;
}

async function persist() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const snapshot = JSON.stringify(cache, null, 2);
  writeChain = writeChain.then(() => fs.writeFile(DB_FILE, snapshot, "utf8"));
  return writeChain;
}

export async function getUserByEmail(email) {
  const db = await load();
  const target = String(email).toLowerCase();
  return db.users.find((u) => u.email === target) || null;
}

export async function getUserById(id) {
  const db = await load();
  return db.users.find((u) => u.id === id) || null;
}

export async function createUser({ name, email, passwordHash }) {
  const db = await load();
  db.seq += 1;
  const user = {
    id: db.seq,
    name,
    email: String(email).toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  await persist();
  return user;
}

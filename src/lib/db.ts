import path from "path";
import fs from "fs/promises";

export type Db = Record<string, any[]>;
const DB_PATH = path.join(process.cwd(), "db.json");

export async function readDb(): Promise<Db> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    return JSON.parse(raw || "{}");
  } catch (err) {
    // If file doesn't exist or can't be read, return empty db
    return {};
  }
}

export async function writeDb(db: Db): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Writing is disabled in production. Use a real database.");
  }
  const json = JSON.stringify(db, null, 2);
  await fs.writeFile(DB_PATH, json, "utf8");
}

export function generateId(items: any[]): string {
  // lightweight hex-id generator (string) that avoids collisions within the collection
  let id: string;
  do {
    id = Math.random().toString(16).slice(2, 8);
  } while (items.some((it: any) => String(it?.id) === id));
  return id;
}
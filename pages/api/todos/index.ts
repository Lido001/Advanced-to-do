import type { NextApiRequest, NextApiResponse } from "next";
import { readDb, writeDb, generateId } from "../../../src/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db = await readDb();
  const list = Array.isArray(db.todos) ? db.todos : [];

  if (req.method === "GET") {
    return res.status(200).json(list);
  }

  if (req.method === "POST") {
    if (process.env.NODE_ENV === "production") {
      return res.status(405).json({ message: "POST disabled in production on mock API" });
    }

    const body = req.body || {};
    const id = body.id ?? generateId(list);
    const item = { id, ...body };
    list.push(item);
    db.todos = list;
    await writeDb(db);
    return res.status(201).json(item);
  }

  res.setHeader("Allow", "GET,POST");
  return res.status(405).end();
}
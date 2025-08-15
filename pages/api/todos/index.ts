import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Todo from "@/../../models/Todo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      try {
        const todo = await Todo.create(req.body);
        return res.status(201).json(todo);
      } catch (error:any) {
        console.error("POST /api/todos error:", error);
        return res.status(500).json({ error: error.message });
      }
    case "GET":
      try {
        const todos = await Todo.find({});
        return res.status(200).json(todos);
      } catch (error:any) {
        return res.status(500).json({ error: error.message });
      }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

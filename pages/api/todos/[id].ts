import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Todo from "@../../../models/Todo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query; 
  if (!mongoose.Types.ObjectId.isValid(id as string)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    switch (req.method) {
      case "GET": {
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ message: "Not found" });
        return res.status(200).json(todo);
      }

      case "PUT":
      case "PATCH": {
        const updated = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Not found" });
        return res.status(200).json(updated);
      }

      case "DELETE": {
        await Todo.findByIdAndDelete(id);
        return res.status(204).end();
      }

      default:
        res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
}




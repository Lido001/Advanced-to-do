// pages/api/todos/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'db.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Missing todo ID' });
  }

  try {
    const fileData = fs.readFileSync(dbPath, 'utf-8');
    const jsonData = JSON.parse(fileData);
    let todos = jsonData.todos || [];

    if (req.method === 'GET') {
      const todo = todos.find((t: any) => t.id == id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      return res.status(200).json(todo);
    }

    if (req.method === 'PUT') {
      const index = todos.findIndex((t: any) => t.id == id);
      if (index === -1) {
        return res.status(404).json({ message: 'Todo not found' });
      }
      todos[index] = { ...todos[index], ...req.body };
      fs.writeFileSync(dbPath, JSON.stringify({ todos }, null, 2));
      return res.status(200).json(todos[index]);
    }

    if (req.method === 'DELETE') {
      todos = todos.filter((t: any) => t.id != id);
      fs.writeFileSync(dbPath, JSON.stringify({ todos }, null, 2));
      return res.status(200).json({ message: 'Todo deleted successfully' });
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    return res.status(500).json({ message: 'Error handling request', error });
  }
}

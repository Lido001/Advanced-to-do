import mongoose, {  Document } from "mongoose";

export interface ITodo extends Document {
  _id:string;
  data: string;
  priority: string;
  assign: string;
  completed: boolean;
  status: string;
  from?: Date;
  to?: Date;
}

const TodoSchema = new mongoose.Schema({
  data: { type: String, required: true },
  priority: { type: String, required: true },
  assign: { type: String, required: true },
  status: { type: String, required: true },
  from: { type: String },
  to: { type: String },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);


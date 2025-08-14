export interface Task {
  id: string;
  data: string;
  priority: string;
  assign: string;
  status: string;
  from?: string | null;
  to?: string | null;
  completed: boolean;
}
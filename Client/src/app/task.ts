export interface Task {
  id: number;
  name: string;
  project_id: number;
  assigned_to: number;
  description: string;
  status: string;
  priority: number;
}

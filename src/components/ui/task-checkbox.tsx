import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQuery } from "@apollo/client/react";

import { GET_TASKS } from "@/graphql/queries/task";

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type GetTasksResponse = {
  tasks: Task[];
};

export default function TaskCheckbox() {
  const { data, loading, error } = useQuery<GetTasksResponse>(GET_TASKS);

  if (loading) {
    return <div className="py-4">Loading tasks...</div>;
  }

  if (error || !data) {
    return <div className="py-4 text-red-500">Failed to load tasks</div>;
  }

  const tasks = data.tasks.slice(0, 15);

  return (
    <div className="space-y-4 p-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center space-x-3 py-2">
          <Checkbox
            className="data-[state=checked]:border-green-500 data-[state=checked]:bg-green-500 h-6 w-6"
            id={`task-${task.id}`}
            defaultChecked={task.completed}
          >
            <Check className="h-5 w-5 text-white" />
          </Checkbox>

          <Label htmlFor={`task-${task.id}`} className="text-base cursor-pointer flex-1">
            <span className={task.completed ? "line-through text-gray-500" : ""}>
              {task.title}
            </span>
            <span className="ml-2 text-xs text-gray-400">
              (User: {task.userId})
            </span>
          </Label>
        </div>
      ))}
    </div>
  );
}

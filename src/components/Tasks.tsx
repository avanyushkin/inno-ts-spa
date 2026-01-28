import { useQuery } from "@apollo/client/react";
import { GET_TASKS, MOCK_TASKS } from "@/graphql/queries/task";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export function Tasks() {
  const { data } = useQuery<{ tasks: Task[] }>(GET_TASKS, {
    errorPolicy: "all",
  });

  const tasks = data?.tasks?.length ? data.tasks : MOCK_TASKS;

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">
          No tasks found
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Checkbox checked={task.completed} />
              <span
                className={`flex-1 ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.title}
              </span>
              <span className="text-xs text-gray-400">
                User: {task.userId}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
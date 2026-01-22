import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getTasks } from "@/api/task";
import type { Task } from "@/api/task";

export default function TaskCheckbox() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect ( () => {
    async function loadTasks () {
      try {
        const fetchedTasks = await getTasks ();
        setTasks (fetchedTasks.slice (0, 15));
      } catch (error) {
        console.error (error);
      } finally {
        setLoading (false);
      }
    }

    loadTasks ();
  }, []);

  if (loading) {
    return <div className="py-4">Loading tasks...</div>;
  }

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
          <Label 
            htmlFor={`task-${task.id}`} 
            className="text-base cursor-pointer flex-1"
          >
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
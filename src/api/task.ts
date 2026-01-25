export type Task = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export async function getTasks (): Promise<Task[]> {
  try {
    const res = await fetch ("https://jsonplaceholder.typicode.com/todos");
    if (!res.ok) {
      throw new Error ("fail fetching (task)");
    }
    return await res.json ();
  } catch (error) {
    console.error (error);
    return [];
  }
}

export async function getUserTasks (userId: number): Promise<Task[]> {
  try {
    const res = await fetch (`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    if (!res.ok) {
      throw new Error ("fail fetching (task)");
    }
    return await res.json ();
  } catch (error) {
    console.error (error);
    return [];
  }
}
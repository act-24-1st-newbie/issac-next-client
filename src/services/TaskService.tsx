export interface Task {
  id: string;
  contents: string;
  createdDate: string;
  modifiedDate?: string;
  isDone?: boolean;
}

class TaskService {
  sortMethod: string;

  constructor() {
    this.sortMethod = "Latest";
  }

  sortByRegistrationDate(a: Task, b: Task): number {
    return (
      new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
    );
  }

  sortByModifiedDate(a: Task, b: Task): number {
    if (!a.modifiedDate || !b.modifiedDate) {
      return 0;
    }
    return (
      new Date(a.modifiedDate).getTime() - new Date(b.modifiedDate).getTime()
    );
  }

  async fetchTasks(): Promise<Task[]> {
    try {
      const response = await fetch("http://localhost:8080/tasks");
      if (!response.ok) {
        throw new Error(`Error fetching tasks: ${response.statusText}`);
      }
      const data: Task[] = await response.json();
      if (data.length === 0) {
        return [];
      }
      let sortedTasks = data.sort((a: Task, b: Task) => {
        if (this.sortMethod === "Latest") {
          return (
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
          );
        } else {
          return (
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
          );
        }
      });
      return sortedTasks;
    } catch (error: any) {
      console.error("Error fetching tasks:", error.message);
      return [];
    }
  }

  async addNewTask(text: string): Promise<Task[]> {
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error(`Error adding new task: ${response.statusText}`);
      }
      return this.fetchTasks();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async deleteAllTasks(): Promise<Task[]> {
    try {
      const response = await fetch(`http://localhost:8080/tasks`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting tasks: ${response.statusText}`);
      }
      return this.fetchTasks();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async patchTask(task: Partial<Task> & { id: string }): Promise<Task[]> {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: task.contents,
          isDone: task.isDone,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update task: ${response.statusText}`);
      }
      return this.fetchTasks();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async deleteTask(taskId: string): Promise<Task[]> {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting task: ${response.statusText}`);
      }
      return this.fetchTasks();
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export const taskService = new TaskService();

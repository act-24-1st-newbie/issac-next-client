import axios from 'axios';

class TaskService {
  constructor() {
    this.sortMethod = 'Latest';
  }
  sortByRegistrationDate(a, b) {
    return new Date(a.createdDate) - new Date(b.createdDate);
  }
  sortByModifiedDate(a, b) {
    return new Date(a.modifiedDate) - new Date(b.modifiedDate);
  }
  async fetchTasks() {
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      const data = response.data;
      if (data.length === 0) {
        return [];
      }
      let sortedTasks = data.sort((a, b) => {
        if (this.sortMethod === 'Latest') {
          return new Date(b.createdDate) - new Date(a.createdDate);
        } else {
          return new Date(a.createdDate) - new Date(b.createdDate);
        }
      });
      return sortedTasks;
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      return [];
    }
  }

  async addNewTask(text) {
    try {
      const response = await axios.post('http://localhost:8080/tasks', { text });
      return await this.fetchTasks();
    } catch (error) {
      console.error('Error adding new task:', error.message);
    }
  }

  async deleteAllTasks() {
    try {
      const response = await axios.delete(`http://localhost:8080/tasks`);
      if (response.status === 200) {
      }
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
    return await this.fetchTasks();
  }

  async patchTask(task) {
    try {
      const response = await axios.patch(`http://localhost:8080/tasks/${task.id}`, {
        contents: task.contents,
        isDone: task.isDone,
      });

      if (!response.status === 200) {
        throw new Error('Failed to update task');
      }
      return await this.fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error.message);
    }
  }

  async deleteTask(taskId) {
    try {
      const response = await axios.delete(`http://localhost:8080/tasks/${taskId}`);
      if (response.status === 200) {
        return await this.fetchTasks();
      }
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  }
}

export const taskService = new TaskService();

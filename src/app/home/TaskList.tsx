import InputField from "@/components/InputField/InputField.client";
import { Task, taskService } from "@/services/TaskService";
import { FC, useEffect, useRef, useState } from "react";
interface TaskListProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const formatDate = (date: Date): string => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
};

export const TaskList: FC<TaskListProps> = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleContentClick = (task: Task) => {
    setEditingTask(task);
  };

  useEffect(() => {
    if (editingTask) {
      const inputField = inputRefs.current[editingTask.id];
      inputField?.focus();
    }
  }, [editingTask]);

  const handleCheckBoxClick = async (task: Task) => {
    const updatedTasks = await taskService.patchTask({
      ...task,
      isDone: !task.isDone,
    });
    setTasks(updatedTasks);
  };

  const handleSubmit = async (task: Task, text: string) => {
    const updatedTasks = await taskService.patchTask({
      ...task,
      contents: text,
    });
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId: string) => {
    const updatedTasks = await taskService.deleteTask(taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="TodoList">
      <ul>
        {tasks.map((task) => (
          <li className="TaskList" key={task.id}>
            {task === editingTask ? (
              <InputField
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[task.id] = el;
                }}
                border="true"
                initial_input={task.contents}
                onSubmit={(text) => handleSubmit(task, text)}
              />
            ) : (
              <>
                <input
                  className="TaskCheckBox"
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => handleCheckBoxClick(task)}
                />
                <div className="Task">
                  <div
                    className="TaskContents"
                    onClick={() => handleContentClick(task)}
                    style={{
                      textDecoration: task.isDone ? "line-through" : "none",
                    }}
                  >
                    {task.contents}
                  </div>
                  <div className="TaskCreatedDate">
                    {formatDate(new Date(task.createdDate))}
                  </div>
                </div>
                <div
                  className="bg-remove-nor hover:bg-remove-hov mb-2.5 ml-2.5 mr-2.5 mt-2.5 h-7 w-7 cursor-pointer bg-contain bg-center bg-no-repeat"
                  onClick={() => handleDeleteTask(task.id)}
                  aria-label="작업 삭제"
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

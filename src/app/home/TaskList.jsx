import { useEffect, useRef, useState } from "preact/hooks";
import PropTypes from "prop-types";
import InputField from "../../Component/InputField/InputField";
import { taskService } from "./TaskService";
const formatDate = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${month}/${day} ${hours}:${minutes}`;
};

export const TaskList = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null);
  const inputRefs = useRef({});
  const handleContentClick = (task) => {
    setEditingTask(task);
  };
  useEffect(() => {
    if (editingTask !== null) {
      const inputField = inputRefs.current[editingTask.id];
      if (inputField) {
        inputField.focus();
      }
    }
  }, [editingTask]);
  const handleCheckBoxClick = async (task) => {
    const updatedTasks = await taskService.patchTask({
      ...task,
      isDone: !task.isDone,
    });
    setTasks(updatedTasks);
  };
  const handleSubmit = async (task, text) => {
    const updatedTasks = await taskService.patchTask({
      ...task,
      contents: text,
    });
    setTasks(updatedTasks);
    setEditingTask("");
  };
  const handleDeleteTask = async (taskId) => {
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
                ref={(el) => (inputRefs.current[task.id] = el)}
                className="TaskContentsInput"
                border="true"
                initial_input={task.contents}
                onSubmit={(text) => handleSubmit(task, text)}
              ></InputField>
            ) : (
              <>
                <input
                  className="TaskCheckBox"
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => handleCheckBoxClick(task)}
                ></input>
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
                <img
                  className="TaskRemoveButton"
                  onClick={() => handleDeleteTask(task.id)}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  setTasks: PropTypes.func,
};
export default TaskList;

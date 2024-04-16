import { taskService } from "@/services/TaskService";
import InputField from "./InputField.client";
export const HomeInputField = () => {
  const handleOnSubmit = async (text: string) => {
    const updatedTasks = await taskService.addNewTask(text);
  };
  return (
    <InputField
      placeholder="Enter your task"
      border="false"
      onSubmit={handleOnSubmit}
    ></InputField>
  );
};

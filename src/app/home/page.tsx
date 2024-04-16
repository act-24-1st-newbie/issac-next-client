"use client";
import TaskList from "@/app/home/TaskList";
import { useDetectClose } from "@/app/hooks/useDetectClose";
import Header from "@/components/Header/Header";
import InputField from "@/components/InputField/InputField.client";
import { Task, taskService } from "@/services/TaskService";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import "./Home.css";
const Home: FC = () => {
  const [greeting, setGreeting] = useState<string>("");
  const [taskNum, setTaskNum] = useState<number>(0);
  const [incompleteTaskNum, setIncompleteTaskNum] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [sortingMethod, setSortingMethod] = useState<string>("Latest");
  const dropdownList = ["Latest", "Oldest"];
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setName(sessionStorage.getItem("username") || null);
    }
  }, []);
  useEffect(() => {
    const incompleteTaskCount = tasks.filter((task) => !task.isDone).length;
    setIncompleteTaskNum(incompleteTaskCount);
  }, [tasks]);
  useEffect(() => {
    setTaskNum(tasks.length);
  }, [tasks.length]);
  useEffect(() => {
    const fetchData = async () => {
      const tasksData = await taskService.fetchTasks();
      setTasks(tasksData);
      console.log(tasks);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const getCurrentGreeting = () => {
      const now = new Date();
      const hours = now.getHours();

      if (hours >= 7 && hours < 12) {
        return "Good morning";
      } else if (hours >= 12 && hours < 18) {
        return "Good afternoon";
      } else if (hours >= 18 && hours < 22) {
        return "Good evening";
      } else {
        return "Good night";
      }
    };

    setGreeting(getCurrentGreeting());
  }, []);
  const deleteAllTasks = async () => {
    const updatedTasks = await taskService.deleteAllTasks();
    setTasks(updatedTasks);
  };
  const handleOnSubmit = async (text: string) => {
    const updatedTasks = await taskService.addNewTask(text);
    setTasks(updatedTasks);
  };
  const handleItemClickAndClose = (item: string) => {
    taskService.sortMethod = item;
    if (item !== sortingMethod) setTasks(tasks.reverse());
    setSortingMethod(item);
    setIsOpen(false);
  };
  return (
    <div className="Container">
      <Header></Header>
      <div className="SummaryContainer">
        <div className="TextBox">
          {greeting}, {name}
        </div>
        <p className="TextBox">You&apos;ve got</p>
        <h1 className="TaskNum">
          {incompleteTaskNum}/{taskNum}
        </h1>
        <p className="TextBox">tasks Today!</p>
        <InputField
          placeholder="Enter your task"
          border="false"
          onSubmit={handleOnSubmit}
        ></InputField>
      </div>
      <div className="TodoListContainer">
        {taskNum === 0 ? (
          <div>
            <Image
              className="EmptyImage"
              src="/img/illust_empty.png"
              width={100}
              height={100}
              alt="Empty task illustration"
            />
            <div className="EmptyMessage">There is no task registered </div>
          </div>
        ) : (
          <div>
            <div className="Buttons">
              <div className="Dropdown" ref={dropDownRef}>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="DropdownButton"
                >
                  <p>{sortingMethod}</p>
                  <Image
                    src={
                      isOpen ? "/img/ic_arrow_up.png" : "/img/ic_arrow_down.png"
                    }
                    width={28}
                    height={28}
                    alt="Dropdown arrow image"
                  />
                </div>
                {isOpen && (
                  <div className="DropdownContent">
                    {dropdownList.map((option, index) => (
                      <p
                        key={index}
                        onClick={() => handleItemClickAndClose(option)}
                      >
                        {option}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <button className="ClearAllButton" onClick={deleteAllTasks}>
                Clear All
              </button>
            </div>
            <TaskList tasks={tasks} setTasks={setTasks}></TaskList>
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;

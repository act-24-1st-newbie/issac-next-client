import Image from "next/image";
import { useEffect, useRef, useState } from "preact/hooks";
import InputField from "../../Component/InputField/InputField.js";
import Header from "../../Layout/Header/Header";
import { useDetectClose } from "../../assets/hooks/useDetectClose.jsx";
import "./Home.css";
import TaskList from "./TaskList.jsx";
import { taskService } from "./TaskService.jsx";
export const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [taskNum, setTaskNum] = useState(0);
  const [incompleteTaskNum, setIncompleteTaskNum] = useState(0);
  const [tasks, setTasks] = useState([]);
  const dropDownRef = useRef();
  const [isOpen, setIsOpen] = useDetectClose(dropDownRef, false);
  const [sortingMethod, setSortingMethod] = useState("Latest");
  const dropdownList = ["Latest", "Oldest"];
  const name = sessionStorage.username;
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
  const handleOnSubmit = async (text) => {
    const updatedTasks = await taskService.addNewTask(text);
    setTasks(updatedTasks);
  };
  const handleItemClickAndClose = (item) => {
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
          className="InputField"
          placeholder="Enter your task"
          border="false"
          onSubmit={handleOnSubmit}
        ></InputField>
      </div>
      <div className="TodoListContainer">
        {taskNum === 0 ? (
          <div>
            <img className="EmptyImage" src="img/illust_empty.png"></img>
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
                      isOpen ? "img/ic_arrow_up.png" : "img/ic_arrow_down.png"
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

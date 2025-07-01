import { useEffect, useReducer, useState } from "react";
import Task from "./Task";
import { Input } from "../../components/ui/input";
import tasksReducer from "./tasksReducer";

export type CryptoUUID = `${string}-${string}-${string}-${string}-${string}`;
export type TaskType = {
  id: CryptoUUID;
  name: string;
  completed: boolean;
  active: boolean;
};

const Tasks = () => {
  // const [tasks, setTasks] = useState<TaskType[]>([]);
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    dispatch({ type: "load" });
  }, []);

  const handleNewTaskSubmission = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      dispatch({ type: "new", newTaskName: inputValue });
      setInputValue("");
    }
  };

  const handleTaskCompletion = (id: CryptoUUID) => {
    dispatch({ type: "complete", id: id });
  };

  const handleTaskActivation = (id: CryptoUUID) => {
    dispatch({ type: "activate", id: id });
  };

  const handleDeleteTask = (id: CryptoUUID) => {
    dispatch({ type: "delete", id: id });
  };

  return (
    <>
      <Input
        id="newTaskInput"
        type="text"
        value={inputValue}
        placeholder="New task"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleNewTaskSubmission}
      />
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onComplete={handleTaskCompletion}
            onActivate={handleTaskActivation}
            onDelete={handleDeleteTask}
          ></Task>
        );
      })}
    </>
  );
};

export default Tasks;

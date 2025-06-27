import { useEffect, useState } from "react";
import Task from "./Task";
import { Input } from "../../components/ui/input";

export type CryptoUUID = `${string}-${string}-${string}-${string}-${string}`;
export type TaskType = {
  id: CryptoUUID;
  name: string;
  completed: boolean;
  active: boolean;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const initialTasks = localStorage.getItem("tasks");
    if (initialTasks) {
      setTasks(JSON.parse(initialTasks));
    }
  }, []);

  const handleNewTaskSubmission = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      setTasks((currentTaskList) => {
        const newTask: TaskType = {
          id: crypto.randomUUID(),
          name: inputValue,
          completed: false,
          active: currentTaskList.length === 0 ? true : false,
        };
        const newTaskList = [...currentTaskList, newTask];
        localStorage.setItem("tasks", JSON.stringify(newTaskList));
        return newTaskList;
      });
      setInputValue("");
    }
  };

  const updateTasks = (updated: TaskType[]) => {
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  const toggleTaskCompletion = (id: CryptoUUID) => {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    updateTasks(updated);
  };

  const toggleTaskActivation = (id: CryptoUUID) => {
    const updated = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, active: true };
      } else {
        return { ...task, active: false };
      }
    });
    updateTasks(updated);
  };

  const deleteTask = (id: string) => {
    const targetTask = tasks.find((task) => task.id === id);
    const activeDeleted = targetTask?.active || false;

    const updated = tasks.filter((task) => task.id !== id);

    if (activeDeleted && updated.length > 0) {
      updated[0] = { ...updated[0], active: true };
    }

    updateTasks(updated);
  };

  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onComplete={toggleTaskCompletion}
            onActivate={toggleTaskActivation}
            onDelete={deleteTask}
          ></Task>
        );
      })}

      <Input
        id="newTaskInput"
        type="text"
        value={inputValue}
        placeholder="New task"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleNewTaskSubmission}
      />
    </>
  );
};

export default Tasks;

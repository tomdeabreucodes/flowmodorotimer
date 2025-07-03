import type { CryptoUUID, TaskType } from "./Tasks";

type TaskAction = {
  type: "load" | "new" | "delete" | "complete" | "activate";
  id?: CryptoUUID;
  newTaskName?: string;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
};

export default function tasksReducer(
  tasks: TaskType[],
  action: TaskAction
): TaskType[] {
  switch (action.type) {
    case "load": {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : tasks;
    }
    case "new": {
      if (!action.newTaskName) return tasks;
      const newTask: TaskType = {
        id: crypto.randomUUID(),
        name: action.newTaskName,
        completed: false,
        active: tasks.length === 0 ? true : false,
      };
      const updated = [...tasks, newTask];
      localStorage.setItem("tasks", JSON.stringify(updated));

      return updated;
    }
    case "complete": {
      if (!action.id) return tasks;
      const updated = tasks.map((task) => {
        if (task.id !== action.id) return task;
        const target_completed = !task.completed;
        if (target_completed && action.audioRef) {
          action.audioRef.current?.play();
        }
        return { ...task, completed: target_completed };
      });
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    }
    case "activate": {
      const updated = tasks.map((task) => {
        return { ...task, active: task.id === action.id ? true : false };
      });
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    }
    case "delete": {
      const targetTask = tasks.find((task) => task.id === action.id);
      const activeDeleted = targetTask?.active || false;

      const updated = tasks.filter((task) => task.id !== action.id);

      if (activeDeleted && updated.length > 0) {
        updated[0] = { ...updated[0], active: true };
      }
      localStorage.setItem("tasks", JSON.stringify(updated));
      return updated;
    }
  }
}

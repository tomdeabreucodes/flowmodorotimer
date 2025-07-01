import type { CryptoUUID, TaskType } from "./Tasks";
import { PiTarget } from "react-icons/pi";
import { FaTrashAlt } from "react-icons/fa";

interface TaskProps {
  task: TaskType;
  onComplete: (id: CryptoUUID) => void;
  onActivate: (id: CryptoUUID) => void;
  onDelete: (id: CryptoUUID) => void;
}

const Task = ({ task, onComplete, onActivate, onDelete }: TaskProps) => {
  return (
    <div>
      <input
        type="checkbox"
        id={`task_${task.id}`}
        name="task"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
      />
      <label htmlFor={`task_${task.id}`}>{task.name}</label>
      <PiTarget
        onClick={() => onActivate(task.id)}
        className={`cursor-pointer ${task.active ? "text-green-500" : ""}`}
      />
      <FaTrashAlt
        className="cursor-pointer"
        onClick={() => onDelete(task.id)}
      />
    </div>
  );
};

export default Task;

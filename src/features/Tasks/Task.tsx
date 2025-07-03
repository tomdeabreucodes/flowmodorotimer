import type { CryptoUUID, TaskType } from "./Tasks";
import { PiTarget } from "react-icons/pi";
import { FaRegTrashCan } from "react-icons/fa6";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskProps {
  task: TaskType;
  onComplete: (id: CryptoUUID) => void;
  onActivate: (id: CryptoUUID) => void;
  onDelete: (id: CryptoUUID) => void;
}

const Task = ({ task, onComplete, onActivate, onDelete }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onActivate(task.id);
        }
      }}
      className={`flex border bg-primary-foreground p-3 rounded-lg items-center justify-start space-x-2 group ${
        task.active
          ? "border-1 border-cerulean-400 ring-4 ring-cerulean-400/30"
          : ""
      }`}
    >
      <input
        type="checkbox"
        id={`task_${task.id}`}
        name="task"
        checked={task.completed}
        onChange={() => onComplete(task.id)}
        className="mr-3 accent-cerulean-400"
      />
      <label
        htmlFor={`task_${task.id}`}
        className={`mr-auto max-w-3/4 ${
          task.completed && "text-current/50 line-through"
        }`}
      >
        {task.name}
      </label>
      <FaRegTrashCan
        className="cursor-pointer text-red-600 sm:invisible group-hover:visible"
        onClick={() => onDelete(task.id)}
        size={16}
      />
      <PiTarget
        onClick={() => onActivate(task.id)}
        className={`cursor-pointer  ${
          task.active
            ? "text-cerulean-400 group-hover:visible"
            : "sm:invisible group-hover:visible"
        }`}
        size={22}
      />
    </div>
  );
};

export default Task;

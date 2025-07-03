import { useEffect, useReducer, useRef, useState } from "react";
import Task from "./Task";
import { Input } from "../../components/ui/input";
import tasksReducer from "./tasksReducer";
import completionSound from "../../assets/completion.mp3";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export type CryptoUUID = `${string}-${string}-${string}-${string}-${string}`;
export type TaskType = {
  id: CryptoUUID;
  name: string;
  completed: boolean;
  active: boolean;
};

const Tasks = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [inputValue, setInputValue] = useState("");

  const completionAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    dispatch({ type: "load" });
    completionAudioRef.current = new Audio(completionSound);
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
    dispatch({ type: "complete", id: id, audioRef: completionAudioRef });
  };

  const handleTaskActivation = (id: CryptoUUID) => {
    dispatch({ type: "activate", id: id });
  };

  const handleDeleteTask = (id: CryptoUUID) => {
    dispatch({ type: "delete", id: id });
  };

  function handleDragEnd(event: DragEndEvent) {
    dispatch({ type: "sort", event: event });
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 50,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <Input
        id="newTaskInput"
        type="text"
        value={inputValue}
        placeholder="Add task name and hit enter..."
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleNewTaskSubmission}
        className="mb-4"
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className="space-y-2 w-full">
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
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default Tasks;

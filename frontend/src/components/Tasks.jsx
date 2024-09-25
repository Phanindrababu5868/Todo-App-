import React from "react";
import { AppState } from "../context/TodoContext";
import {
  FolderDown,
  FolderUp,
  Trash2,
  FolderSync,
  FolderX,
  NotebookText,
  Activity,
  CircleCheckBig,
  Clock,
} from "lucide-react";
import axios from "axios";

let colors = ["#ffffff", "#facccc", "#FFF8BC", "#bae1d3", "#d8fff6", "#F0DDF8"];

const tabs = [
  {
    name: "Pending",
    icon: <Clock />,
  },
  {
    name: "InProgress",
    icon: <Activity />,
  },
  {
    name: "Completed",
    icon: <CircleCheckBig />,
  },
];

const Tasks = () => {
  const { tasks, setTasks, activeTab, setActiveTab } = AppState();
  let authToken = localStorage.getItem("authToken");

  console.log(tasks);

  const updateTask = async (task, updatedFields) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${task._id}`,
        { ...task, ...updatedFields },
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );
      if (res.data) {
        setTasks((prevTasks) =>
          prevTasks.map((n) => (n._id === task._id ? res.data : n))
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const moveToInProgress = (task) => {
    updateTask(task, { status: "INPROGRESS" });
  };

  const moveToCompleted = (task) => {
    updateTask(task, { status: "COMPLETED" });
  };

  const moveToPending = (task) => {
    updateTask(task, { status: "PENDING" });
  };

  const deleteTask = async (task) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, {
        headers: {
          "x-auth-token": authToken,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((n) => n._id !== task._id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleColorChange = (task, newColor) => {
    updateTask(task, { backgroundColor: newColor });
  };

  const filteredNotes = tasks.filter(
    (each) => each.status === activeTab.toUpperCase()
  );

  //console.log("activetab", activeTab, filteredNotes);

  return (
    <div className="container">
      <div className="tab-container">
        {tabs.map((each, index) => (
          <div
            key={index}
            className={`tab ${
              each.name.toUpperCase() === activeTab.toUpperCase()
                ? "active-tab"
                : ""
            }`}
            onClick={() => setActiveTab(each.name)}
            style={{ fontSize: "24px", display: "flex" }}
          >
            {each.name}&nbsp; {each.icon}
          </div>
        ))}
      </div>
      <div id="tasks-list">
        {filteredNotes.length === 0 ? (
          <p>Tasks you add appear here </p>
        ) : (
          filteredNotes.map((task) => (
            <div
              key={task._id}
              style={{ background: `${task.backgroundColor}` }}
              className="task"
            >
              <h1 className="task-title">{task.title}</h1>
              <p className="task-content">{task.content}</p>

              <div className="action-container">
                <label>BgColor</label>
                <select
                  value={task.backgroundColor}
                  onChange={(e) => handleColorChange(task, e.target.value)}
                  style={{ backgroundColor: task.backgroundColor }}
                >
                  {colors.map((color, index) => (
                    <option
                      value={color}
                      key={index}
                      style={{ backgroundColor: color }}
                    >
                      {color}
                    </option>
                  ))}
                </select>
                {activeTab === "Pending" && (
                  <>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="move to InProgress(working)"
                      onClick={() => moveToInProgress(task)}
                    >
                      <Activity color="black" />
                    </button>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="move to Completed"
                      onClick={() => moveToCompleted(task)}
                    >
                      <CircleCheckBig color="black" />
                    </button>
                  </>
                )}

                {activeTab === "InProgress" && (
                  <>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="move to Pending"
                      onClick={() => moveToPending(task)}
                    >
                      <Clock color="black" />
                    </button>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="move to Completed"
                      onClick={() => moveToCompleted(task)}
                    >
                      <CircleCheckBig color="black" />
                    </button>
                  </>
                )}
                {activeTab === "Completed" && (
                  <>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="delete task"
                      onClick={() => deleteTask(task)}
                    >
                      <FolderX color="black" />
                    </button>
                    <button
                      style={{ backgroundColor: "transparent" }}
                      title="move to InProgress(working)"
                      onClick={() => moveToPending(task)}
                    >
                      <Activity color="black" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;

// import React, { useState } from "react";
// import { AppState } from "../context/TodoContext";
// import axios from "axios";

// const TodoForm = () => {
//   const { tasks, setTasks } = AppState();
//   // const [searchTerm, setSearchTerm] = useState("");
//   const [content, setContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const authToken = localStorage.getItem("authToken");

//   const handleCreateNote = async () => {
//     if (content === "") {
//       alert("please add task ");
//       return;
//     }
//     const newTask = {
//       content,
//     };
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/tasks`,
//         newTask,
//         {
//           headers: {
//             "x-auth-token": authToken,
//           },
//         }
//       );

//       if (res.data) {
//         setTasks([newTask, ...tasks]);
//       }
//     } catch (err) {
//     } finally {
//       setContent("");
//       setLoading(false);
//     }
//   };

//   return (
//     <div id="note-creation">
//       <h1>Crate Todo</h1>

//       <textarea
//         id="note-content"
//         placeholder="Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         required
//       ></textarea>

//       <button
//         id="create-note-btn"
//         disabled={loading}
//         onClick={handleCreateNote}
//       >
//         {loading ? "Creating....." : "Create Todo"}
//       </button>
//     </div>
//   );
// };

// export default TodoForm;

import React, { useState } from "react";
import { AppState } from "../context/TodoContext";
import axios from "axios";

const TodoForm = () => {
  const { tasks, setTasks } = AppState();
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("Pending"); // New state for status
  const [loading, setLoading] = useState(false);
  const authToken = localStorage.getItem("authToken");

  const handleCreateNote = async () => {
    if (content === "") {
      alert("please add a task");
      return;
    }
    const newTask = {
      content,
      status: status.toLocaleUpperCase(), // Include status in the new task
    };
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/tasks`,
        newTask,
        {
          headers: {
            "x-auth-token": authToken,
          },
        }
      );

      if (res.data) {
        setTasks([newTask, ...tasks]);
      }
    } catch (err) {
    } finally {
      setContent("");
      setLoading(false);
    }
  };

  return (
    <div id="task-creation">
      <h1>Create Todo</h1>

      <textarea
        id="task-content"
        placeholder="Todo"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>

      <div>
        <h3>Status</h3>
        <label>
          <input
            type="radio"
            value="Pending"
            checked={status === "Pending"}
            onChange={() => setStatus("Pending")}
          />
          Pending
        </label>
        <label>
          <input
            type="radio"
            value="InProgress"
            checked={status === "InProgress"}
            onChange={() => setStatus("InProgress")}
          />
          In Progress
        </label>
        <label>
          <input
            type="radio"
            value="Completed"
            checked={status === "Completed"}
            onChange={() => setStatus("Completed")}
          />
          Completed
        </label>
      </div>

      <button
        id="create-note-btn"
        disabled={loading}
        onClick={handleCreateNote}
      >
        {loading ? "Creating....." : "Create Todo"}
      </button>
    </div>
  );
};

export default TodoForm;

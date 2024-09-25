import { useEffect } from "react";
import "./App.css";
import Header from "./components/layout/Header";
import TodoForm from "./components/TodoForm";
import Tasks from "./components/Tasks";
import { AppState } from "./context/TodoContext";
import Auth from "./components/Auth";
import MoveUpButton from "./components/MoveUpButton";

function App() {
  let authToken = localStorage.getItem("authToken");
  const { setTasks } = AppState();
  const fetchTasks = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
      headers: {
        "x-auth-token": authToken,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Failed to fetch tasks");
        }
        return response.json();
      })
      .then((tasks) => {
        console.log(tasks);
        setTasks(tasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        // handleUnauthorized(error);
        alert("Somting went wrong");
      });
  };
  useEffect(() => {
    if (authToken) fetchTasks();
  }, []);

  return (
    <>
      <Header />
      {authToken ? (
        <div id="app">
          <TodoForm />
          <Tasks />
          <MoveUpButton />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;

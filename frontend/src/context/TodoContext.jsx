import React, { createContext, useContext, useState } from "react";

const TODO = createContext();

export const TodoContext = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("Pending");

  return (
    <TODO.Provider value={{ tasks, setTasks, activeTab, setActiveTab }}>
      {children}
    </TODO.Provider>
  );
};

export const AppState = () => {
  return useContext(TODO);
};

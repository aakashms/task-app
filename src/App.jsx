import { useState } from "react";
import "./css/App.css";
import NewTask from "./NewTask";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import ExistTask from "./ExistTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newTask" element={<NewTask />} />
        <Route path="/exist/:id" element={<ExistTask />} />
      </Routes>
    </>
  );
}

export default App;

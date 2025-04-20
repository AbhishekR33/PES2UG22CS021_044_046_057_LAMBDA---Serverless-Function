import React from "react";
import { Routes, Route } from "react-router-dom";
import FunctionList from "./Components/FunctionList";
import FunctionForm from "./Components/FunctionForm";
import FunctionDetails from "./Components/FunctionDetails";
import CodeExecutionForm from "./Components/CodeExecutionForm";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FunctionList />} />
      <Route path="/create" element={<FunctionForm />} />
      <Route path="/edit/:id" element={<FunctionForm />} />
      <Route path="/details/:id" element={<FunctionDetails />} />
      <Route path="/execute" element={<CodeExecutionForm />} />
    </Routes>
  );
};

export default App;
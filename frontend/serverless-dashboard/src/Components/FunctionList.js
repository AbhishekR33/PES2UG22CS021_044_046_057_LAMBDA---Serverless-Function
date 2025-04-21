import React, { useEffect, useState } from "react";
import { getFunctions, deleteFunction } from "../api";
import { useNavigate } from "react-router-dom";

const FunctionList = () => {
  const [functions, setFunctions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFunctions();
  }, []);

  const fetchFunctions = async () => {
    const response = await getFunctions();
    setFunctions(response.data);
  };

  const handleDelete = async (id) => {
    await deleteFunction(id);
    fetchFunctions(); // Refresh the list after deletion
  };

  return (
    <div>
      <h1>Serverless Functions</h1>
      <button onClick={() => navigate("/create")}>Create New Function</button>
      <ul>
        {functions.map((func) => (
          <li key={func.id}>
            <strong>{func.name}</strong> - {func.language} - Timeout: {func.timeout}s
            <button onClick={() => navigate(`/edit/${func.id}`)}>Edit</button>
            <button onClick={() => handleDelete(func.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FunctionList;
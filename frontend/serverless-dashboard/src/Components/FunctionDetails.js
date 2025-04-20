import React, { useEffect, useState } from "react";
import { getFunctionById } from "../api";
import { useParams } from "react-router-dom";

const FunctionDetails = () => {
  const { id } = useParams();
  const [func, setFunc] = useState(null);

  useEffect(() => {
    fetchFunction(id);
  }, [id]);

  const fetchFunction = async (id) => {
    const response = await getFunctionById(id);
    setFunc(response.data);
  };

  if (!func) return <div>Loading...</div>;

  return (
    <div>
      <h1>Function Details</h1>
      <p><strong>Name:</strong> {func.name}</p>
      <p><strong>Route:</strong> {func.route}</p>
      <p><strong>Language:</strong> {func.language}</p>
      <p><strong>Timeout:</strong> {func.timeout}s</p>
    </div>
  );
};

export default FunctionDetails;
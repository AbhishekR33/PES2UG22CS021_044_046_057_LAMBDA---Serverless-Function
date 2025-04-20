import React, { useState } from "react";
import axios from "axios";

const CodeExecutionForm = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/execute/", {
        code,
        timeout: 5, // Default timeout
      });
      setOutput(response.data.stdout || response.data.error);
    } catch (error) {
      setOutput("Error executing code: " + error.message);
    }
  };

  return (
    <div>
      <h1>Execute Python Code</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          cols="50"
          placeholder="Enter your Python code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        ></textarea>
        <br />
        <button type="submit">Run Code</button>
      </form>
      <h2>Output:</h2>
      <pre>{output}</pre>
    </div>
  );
};

export default CodeExecutionForm;
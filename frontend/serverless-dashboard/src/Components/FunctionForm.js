import React, { useState, useEffect } from "react";
import { createFunction, getFunctionById, updateFunction } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const FunctionForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    route: "",
    language: "python",
    timeout: 5,
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchFunction(id);
    }
  }, [id]);

  const fetchFunction = async (id) => {
    const response = await getFunctionById(id);
    setFormData(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateFunction(id, formData);
    } else {
      await createFunction(formData);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? "Edit Function" : "Create Function"}</h1>
      <input
        type="text"
        name="name"
        placeholder="Function Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="route"
        placeholder="Route"
        value={formData.route}
        onChange={handleChange}
        required
      />
      <select name="language" value={formData.language} onChange={handleChange}>
        <option value="python">Python</option>
      </select>
      <input
        type="number"
        name="timeout"
        placeholder="Timeout (seconds)"
        value={formData.timeout}
        onChange={handleChange}
        required
      />
      <button type="submit">{id ? "Update" : "Create"}</button>
    </form>
  );
};

export default FunctionForm;
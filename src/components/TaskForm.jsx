import React, { useState } from 'react';
import { postRequest } from './../util/ApiCall'
import { useNavigate } from 'react-router-dom';
import ErrorPopup from './ErrorPopup';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState('to_do');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title: title,
      description: description,
      status: status
    }
    const { data, errors } = await postRequest('/tasks', task );
    if(data){
      navigate('/');
    }
    if(errors){
      setErrors(errors)
    }
  };

  const handleCloseErrorPopup = () => {
    setErrors([]);
  };

  return (
    <>
      {errors.length > 0 && (
        <ErrorPopup errors={errors} onClose={handleCloseErrorPopup} />
      )}
      <form onSubmit={handleSubmit} className="task-form">
        <table>
          <tbody>
            <tr>
              <th><label htmlFor="title">Title:</label></th>
              <td><input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required /></td>
            </tr>
            <tr>
              <th><label htmlFor="description">Description:</label></th>
              <td><textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required /></td>
            </tr>
            <tr>
              <th><label htmlFor="status">Status:</label></th>
              <td>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="to_do">To Do</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit">Create Task</button>
      </form>
    </>
  );
};

export default TaskForm;
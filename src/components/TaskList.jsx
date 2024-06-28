import React, { useState, useEffect } from 'react';
import { getRequest, deleteRequest, putRequest } from './../util/ApiCall'
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await getRequest('/tasks');
    setTasks(data);
  };

  const handleDelete = async (id) => {
    await deleteRequest(`/tasks/${id}`);
    fetchTasks();
  };

  const handleStatusChange = async (id, status) => {
    const task = { status: status }
    await putRequest(`/tasks/${id}`, task );
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) =>
    filter === 'All' ? true : task.status === filter
  );

  return (
    <div>
      <Link to="/new">Create New Task</Link><br /><br />
      <div>
        <label>Filter by status: </label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="to_do">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Done</option>
        </select>
      </div><br />
      <div className="table-div">
        <table className="table-container">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td className="description-cell">{task.description}</td>
                <td>{task.status}</td>
                <td>
                  <select
                    defaultValue={task.status} 
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="table-container"
                  >
                    <option value="to_do">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Done</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskList;
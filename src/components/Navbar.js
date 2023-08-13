import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onGroupChange, onOrderChange, showCheckbox, onCheckboxChange }) => {
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [checked, setChecked] = useState(false);

  const handleGroupChange = (event) => {
    const selectedGrouping = event.target.value;
    setGrouping(selectedGrouping);
    onGroupChange(selectedGrouping);
  };

  const handleOrderChange = (event) => {
    const selectedOrdering = event.target.value;
    setOrdering(selectedOrdering);
    onOrderChange(selectedOrdering);
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
    onCheckboxChange(!checked);
  };

  return (
    <nav className="navbar">
      <div className="display-section">
        <label>Display:</label>
        <select value={grouping} onChange={handleGroupChange}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="ordering-section">
        <label>Order by:</label>
        <select value={ordering} onChange={handleOrderChange}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      {showCheckbox && (
        <div className="checkbox-section">
          <label>Show Checkbox:</label>
          <input type="checkbox" checked={checked} onChange={handleCheckboxChange} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;

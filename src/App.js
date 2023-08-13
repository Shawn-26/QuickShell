import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import MainPage from './components/MainPage';

function App() {
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');
  const [showCheckbox, setShowCheckbox] = useState(false);

  const handleGroupChange = (selectedGrouping) => {
    setGrouping(selectedGrouping);
  };

  const handleOrderChange = (selectedOrdering) => {
    setOrdering(selectedOrdering);
  };

  const handleCheckboxChange = (checked) => {
    setShowCheckbox(checked);
  };

  return (
    <div className="App">
      <Navbar
        onGroupChange={handleGroupChange}
        onOrderChange={handleOrderChange}
        showCheckbox={showCheckbox}
        onCheckboxChange={handleCheckboxChange}
      />
      <MainPage grouping={grouping} ordering={ordering} showCheckbox={showCheckbox} />
    </div>
  );
}

export default App;


// import React from 'react';
import '../../src/App.scss';
import AppBar from '../components/AppBar/AppBar';
import BoardBar from '../components/BoardBar/BoardBar';
import BoardContent from '../components/BoardContent/BoardContent';
import React from 'react';

function Dashboard() {
  return (
    <div className="wrapper">
      <AppBar />
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default Dashboard;

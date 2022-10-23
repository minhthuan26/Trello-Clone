import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Dashboard() {
  const [user, setUser] = useState('');
  return (
    <div>
      {user ? (
        <div>
          <p>{user}</p>
        </div>
      ) : (
        <p>khong co user nao</p>
      )}
      <h1>Dash board Page</h1>
      <input type={'text'} onChange={(e) => setUser(e.target.value)} />
      <nav>
        <Link to={'/login'}>
          <button>Login</button>
        </Link>
        <Link to={'/register'}>
          <button>Register</button>
        </Link>
      </nav>
      <h2>Body</h2>
    </div>
  );
}

export default Dashboard;

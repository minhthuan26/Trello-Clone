import React from "react";
import {Link} from "react-router-dom";
function Dashboard() {
  return (
    <div>
      <h1>Dash board Page</h1>
     <nav>
      <Link to={"/login"}><button>Login</button></Link>
      <Link to={"/register"}><button>Register</button></Link>
     </nav>
      <h2>Body</h2>
    </div>
  )

    
  
}

export default Dashboard;

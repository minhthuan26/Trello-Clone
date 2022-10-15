import React from "react";
import Button from '@mui/material/Button';

function Dashboard() {
  return (
    <div>
    <h1>Dash board Page</h1>
        <div>
        <p>Tên đăng nhập</p>
        <input></input>
        <p>Mật khẩu</p>
        <input></input>
        </div>
        <Button variant="contained">Đăng nhập</Button>
        <button>Đăng nhập</button>
        <button>Đăng ký</button>
    </div>
  )

    
  
}

export default Dashboard;

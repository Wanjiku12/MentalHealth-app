import React, { useState } from 'react';

function LoginPopup() {
  const [show, setShow] = useState(false);
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const showLogin = () => setShow(true);
  const closeLogin = () => setShow(false);

  const login = () => {
    if (userType) {
      alert("Redirecting to " + userType + " panel...");
      closeLogin();
    } else {
      alert("Please select a user type");
    }
  };

  return (
    <div>
      <button onClick={showLogin}>Show Login</button>
      {show && (
        <>
          <div className="overlay" onClick={closeLogin}></div>
          <div className="login-popup">
            <h3>Login as:</h3>
            <select value={userType} onChange={e => setUserType(e.target.value)}>
              <option value="">Select User Type</option>
              <option value="admin">Admin</option>
              <option value="therapist">Therapist</option>
              <option value="customer">Customer Care</option>
              <option value="patient">Patient</option>
            </select>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button onClick={login}>Login</button>
          </div>
        </>
      )}
    </div>
  );
}

export default LoginPopup;

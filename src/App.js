import React, { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [auth, setAuth] = useState(
    !!localStorage.getItem("isAuthenticated")
  );

  const handleLogin = () => {
    setAuth(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          auth ? <Navigate to="/main" /> : <Login onLogin={handleLogin} />
        }
      />
      <Route
        path="/main/*"
        element={
          <PrivateRoute auth={auth}>
            <Main onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={auth ? "/main" : "/login"} />}
      />
    </Routes>
  );
}

export default App;
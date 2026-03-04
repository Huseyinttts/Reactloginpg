import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";

export default function AppNavigator() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
    </Routes>
  );
}
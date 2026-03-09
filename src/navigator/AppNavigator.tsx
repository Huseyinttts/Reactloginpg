import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Login from "../screens/Login";
import Register from "../screens/Register";
import MainLayout from "../components/MainLayout";
import TodoList from "../screens/TodoList";
import AddTodo from "../screens/AddTodo";
import Settings from "../screens/Settings";

export default function AppNavigator() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
      
      {user && (
        <Route path="/home" element={<MainLayout />}>
          <Route index element={<TodoList />} />
          <Route path="add" element={<AddTodo />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      )}
      
      <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
    </Routes>
  );
}
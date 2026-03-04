import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../store/authSlice";
import {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
} from "../store/todoSlice";
import type { RootState } from "../store/store";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const todos = useSelector((state: RootState) => state.todos.todos);

  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  const handleAddOrUpdate = () => {
    if (!text.trim()) return;

    if (editId) {
      dispatch(updateTodo({ id: editId, text, completed: false }));
      setEditId(null);
    } else {
      dispatch(
        addTodo({
          id: Date.now().toString(),
          text,
          completed: false,
        }),
      );
    }
    setText("");
  };

  const handleEdit = (id: string, currentText: string) => {
    setEditId(id);
    setText(currentText);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-neutral-800 pt-20 p-4 ">
      <div className="w-full max-w-2xl flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Hoş geldin, {user?.email || user?.phone || "Kullanıcı"}
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow cursor-pointer"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 p-6 shadow-xl ">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Notlar / Görevler
        </h2>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Bir not veya görev yazın..."
            className="flex-1 border-2 border-indigo-500 dark:border-gray-600 p-3 bg-white dark:bg-transparent text-gray-900 dark:text-white outline-none"
          />
          <button
            onClick={handleAddOrUpdate}
            className="px-6 py-3 bg-indigo-400 hover:bg-indigo-500 text-white font-bold shadow cursor-pointer"
          >
            {editId ? "Güncelle" : "Ekle"}
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 border dark:border-gray-700 rounded shadow-sm"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                  className="w-5 h-5 cursor-pointer accent-indigo-600"
                />
                <span
                  className={`text-lg text-gray-800 dark:text-gray-200 transition-all ${todo.completed ? "line-through opacity-50" : ""}`}
                >
                  {todo.text}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(todo.id, todo.text)}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm font-bold cursor-pointer"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-bold cursor-pointer"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}

          {todos.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-4 font-medium">
              Henüz bir not eklemediniz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

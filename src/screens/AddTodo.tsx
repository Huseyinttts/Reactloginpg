import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    dispatch(addTodo({
      id: Date.now().toString(),
      text,
      completed: false,
      isFavorite: false
    }));
    
    navigate("/home");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 shadow-xl border dark:border-neutral-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Yeni Görev Ekle</h1>
      <form onSubmit={handleAdd} className="flex flex-col gap-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border-2 border-indigo-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 outline-none resize-none min-h-32"
        ></textarea>
        <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors cursor-pointer">
          Kaydet
        </button>
      </form>
    </div>
  );
}
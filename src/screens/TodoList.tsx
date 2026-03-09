import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { toggleFavorite, deleteTodo,editTodo } from "../store/todoSlice";

export default function TodoList() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<any>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  const handleEditClick = (todo: any) => {
    setSelectedTodo(todo);
    setEditTitle(todo.title || todo.text || "");
    setEditDesc(todo.description || "");
    setEditStartDate(todo.startDate || "");
    setEditEndDate(todo.endDate || "");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Yapılacaklar
      </h1>

      {todos.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Henüz bir görev eklenmemiş.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`aspect-square p-4 pt-0 rounded-xl shadow-lg border transition-all flex flex-col justify-between bg-[linear-gradient(transparent_23px,#e2e8f0_24px)] bg-size-[100%_24px] dark:bg-[linear-gradient(transparent_23px,#404040_24px)] dark:bg-size-[100%_24px] ${
                todo.completed
                  ? "bg-gray-100 dark:bg-neutral-800 border-gray-200 dark:border-gray-700 opacity-75"
                  : "bg-white dark:bg-neutral-900 border-indigo-100 dark:border-neutral-700"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <p
                  className={`font-['Caveat'] text-2xl wrap-break-words flex-1 pr-4 line-clamp-4 leading-6 pt-1 ${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {todo.title || todo.text}
                </p>
                <button
                  onClick={() => dispatch(toggleFavorite(todo.id))}
                  className="focus:outline-none cursor-pointer transition-colors pt-1"
                >
                  {todo.isFavorite ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-red-500"
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-400 hover:text-red-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEditClick(todo)}
                  className="flex-1 py-2 rounded font-bold transition-colors cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-bold cursor-pointer transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-lg flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-md border border-gray-300 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Görevi Düzenle
            </h2>
            
            <div className="flex flex-col mb-3">
              <label className="text-sm font-semibold mb-1 dark:text-gray-300">Başlık</label>
              <input 
                type="text" 
                value={editTitle} 
                onChange={(e) => setEditTitle(e.target.value)} 
                className="border p-2 rounded dark:bg-neutral-800 dark:border-gray-600 dark:text-white outline-none" 
              />
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-sm font-semibold mb-1 dark:text-gray-300">Açıklama</label>
              <textarea 
                value={editDesc} 
                onChange={(e) => setEditDesc(e.target.value)} 
                className="border p-2 rounded dark:bg-neutral-800 dark:border-gray-600 dark:text-white outline-none font-['Caveat'] text-xl leading-6 bg-[linear-gradient(transparent_23px,#e2e8f0_24px)] dark:bg-[linear-gradient(transparent_23px,#404040_24px)] bg-size-[100%_24px]" 
                rows={3} 
              />
            </div>

            <div className="flex gap-2 mb-6">
               <div className="flex flex-col w-1/2">
                 <label className="text-sm font-semibold mb-1 dark:text-gray-300">Başlangıç</label>
                 <input type="date" value={editStartDate} onChange={(e) => setEditStartDate(e.target.value)} className="border p-2 rounded dark:bg-neutral-800 dark:border-gray-600 dark:text-white outline-none" />
               </div>
               <div className="flex flex-col w-1/2">
                 <label className="text-sm font-semibold mb-1 dark:text-gray-300">Bitiş</label>
                 <input type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} className="border p-2 rounded dark:bg-neutral-800 dark:border-gray-600 dark:text-white outline-none" />
               </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded font-medium"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  dispatch(editTodo({
                    id: selectedTodo.id,
                    title: editTitle,
                    description: editDesc,
                    startDate: editStartDate,
                    endDate: editEndDate
                  }));
                  handleCloseModal();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
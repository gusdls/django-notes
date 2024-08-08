import { useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import type { INote } from "../components/Note";

function Home() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => setNotes(data))
      .catch((err) => alert(err));
  };
  const deleteNote = (id: number) => {
    api.delete(`/api/notes/delete/${id}/`).then((res) => {
      if (res.status === 204) {
        getNotes();
      } else {
        alert("Failed to delete note.");
      }
    });
  };
  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    api
      .post("/api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) {
          getNotes();
        } else {
          alert("Failed to make note.");
        }
      })
      .catch((err) => alert(err));

    setTitle("");
    setContent("");
  };

  return (
    <div className="flex flex-col gap-8 px-8 py-12 md:flex-row md:gap-10">
      <div className="w-full">
        <h2 className="px-2 text-2xl font-serif font-extrabold">Notes</h2>
        <div className="mt-2 grid gap-4 xl:grid-cols-2">
          {notes.length === 0 ? (
            <div className="text-neutral-400 text-sm">
              Nothing is here, add some your notes!
            </div>
          ) : (
            notes.map((note) => (
              <Note key={note.id} {...note} onDelete={deleteNote} />
            ))
          )}
        </div>
      </div>
      <div className="max-w-lg w-full">
        <h2 className="text-2xl font-serif font-extrabold">Create a note</h2>
        <form onSubmit={handleCreateNote} className="mt-2">
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-2 py-1 rounded-sm border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="mt-2">
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              value={content}
              required
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 w-full h-48 px-2 py-1 rounded-sm border border-gray-300 resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            ></textarea>
          </div>
          <button className="w-full mt-3 py-3 rounded-sm bg-indigo-500 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;

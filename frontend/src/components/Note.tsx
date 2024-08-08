export interface INote {
  id: number;
  title: string;
  content: string;
  created_at: string;
  author: number;
}

function Note({
  id,
  title,
  content,
  created_at,
  onDelete,
}: INote & { onDelete: (id: number) => void }) {
  const formattedDate = new Date(created_at).toLocaleDateString("ko-KR");
  return (
    <div className="px-6 py-3 border border-gray-300 rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div>{content}</div>
      <small>{formattedDate}</small>
      <button
        onClick={() => onDelete(id)}
        className="block mt-2 px-6 py-3 rounded-md bg-red-600 text-white font-bold text-sm"
      >
        Delete
      </button>
    </div>
  );
}

export default Note;

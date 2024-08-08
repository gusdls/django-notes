import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

interface Props {
  route: string;
  method: "login" | "register";
}

function Form({ route, method }: Props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const name = method.charAt(0).toUpperCase() + method.slice(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post(route, { ...form });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 px-8 py-12 max-w-md w-full mx-auto flex flex-col items-center rounded-md shadow-lg"
    >
      <h1 className="text-3xl font-bold font-serif">{name}</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full mt-6 px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full mt-2 px-4 py-2 rounded-sm border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="w-full mt-3 py-3 rounded-sm bg-indigo-500 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500"
      >
        {name}
      </button>
    </form>
  );
}

export default Form;

import { useState } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { Link } from "react-router-dom";
export const Register = () => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [error, setError] = useState();
  const [user, setUser] = useState(initialState);
  const { signUp } = useAuth();
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(user.email, user.password);
      setUser(initialState);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/internal-error") {
        setError("Correo Invalido");
      }
      setError(error.message);
    }
  };
  return (
    <div className="w-full max-w-xs m-auto">
      {error && <Alert error={error} />}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="youremail@company.ltd"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={user.password}
            onChange={handleChange}
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button className="bg-blue-400 block hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>
      <p className="my-4 text-sm flex justify-between px-3 text-blue-500">
        Already have an Account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

import { useState } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";
import { Link } from "react-router-dom";
export const Login = () => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
  };
  const [error, setError] = useState();
  const [user, setUser] = useState(initialState);
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/internal-error") {
        setError("Correo Invalido");
      }
      setError(error.message);
    }
  };
  // Login with Google account
  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  // Reset Password
  const handleResetPassword = async () => {
    if (!user.email) {
      return setError(
        "Please enter your email address for send the reset password"
      );
    } else {
      try {
        await resetPassword(user.email);
        setError("We send you and email for reset password");
      } catch (error) {
        setError(error.message);
      }
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
            onChange={handleChange}
            className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-400 block hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline">
            Login
          </button>
          <a
            href="#!"
            className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
            onClick={handleResetPassword}
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="my-4 text-sm flex justify-between px-3 text-blue-500">
        Don't have an Account? <Link to="/register">Register</Link>
      </p>
      <button
        className="bg-red-400 block hover:bg-red-600 text-white font-bold py-2 2
        w-full rounded shadow-md focus:outline-none focus:shadow-outline"
        onClick={handleGoogleSignIn}
      >
        Log With Google
      </button>
    </div>
  );
};

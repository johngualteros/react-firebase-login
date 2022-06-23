import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { AuthProvider } from "./context/Authcontext";
import { ProtectedRoutes } from "./Components/ProtectedRoutes";
function App() {
  return (
    <div className="text-white bg-zinc-900 h-screen flex">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

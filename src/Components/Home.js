import { useAuth } from "../context/Authcontext";
export const Home = () => {
  const { user, logout, loading } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white rounded shadow-md px-8 pt-6 pb-8">
        <h1 className="text-xl mb-4">
          Welcome{" "}
          <span className="text-blue-900">
            {user.displayName || user.email}
          </span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-blue-400 block hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md focus:outline-none focus:shadow-outline"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

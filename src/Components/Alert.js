export const Alert = ({ error }) => {
  return (
    <div
      className="bg-red-500 border border-red-900 text-red-900 px-4 py-3 rounded relative mb-2 text-center"
      role="alert"
    >
      <span className="sm:inline-block">{error}</span>
    </div>
  );
};

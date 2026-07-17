import { useEffect, useState } from "react";

const DevNoticeModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("visited_before");

    if (!hasVisited) {
      setOpen(true);
      localStorage.setItem("visited_before", "true");
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-lg text-center">

        <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl mx-auto mb-4">
          🛠️
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Notice
        </h2>

        <p className="text-sm text-gray-500 mb-5">
       "Some features on this page are still being finalized. We appreciate your patience as we continue improving your experience."
        </p>

        <button
          onClick={() => setOpen(false)}
          className="w-full bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-full text-sm font-bold transition duration-300"
        >
          Got it
        </button>

      </div>
    </div>
  );
};

export default DevNoticeModal;
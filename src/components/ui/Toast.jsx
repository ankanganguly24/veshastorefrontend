import { useEffect } from "react";

export default function Toast({
  message,
  type = "error", // error | success | info
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const base =
    "fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-lg text-sm max-w-sm animate-slide-in";

  const styles = {
    error: "bg-red-600 text-white",
    success: "bg-green-600 text-white",
    info: "bg-blue-600 text-white",
  };

  return (
    <div className={`${base} ${styles[type]}`}>
      <div className="flex items-start justify-between gap-3">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

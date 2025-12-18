export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal shell */}
      <div className="relative z-10 w-[90%] max-w-lg rounded-xl shadow-2xl overflow-hidden">
        
        {/* Close button */}
        <button
          className="
            absolute top-3 right-3 z-20
            text-zinc-400 hover:text-white
            transition
          "
          onClick={onClose}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}


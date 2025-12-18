import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  // ESC + scroll lock när modalen är öppen
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Modal"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Stäng modal"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal shell */}
      <div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          aria-label="Stäng"
          className="absolute right-3 top-3 z-20 rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

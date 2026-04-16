function EditModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-[#fffafa] w-full max-w-lg rounded-3xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#b08a93] hover:text-[#9a6a76] text-lg"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

export default EditModal;

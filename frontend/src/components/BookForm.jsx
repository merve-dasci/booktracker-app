import { useState } from "react";

const emptyForm = {
  title: "",
  author: "",
  genre: "",
  status: "",
  rating: "",
  image: "",
  note: "",
};

function BookForm({ onAddBook, editingBook, onUpdateBook, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [prevEditingBook, setPrevEditingBook] = useState(null);

  if (editingBook !== prevEditingBook) {
    setPrevEditingBook(editingBook);
    if (editingBook) {
      setFormData({
        id: editingBook.id,
        title: editingBook.title,
        author: editingBook.author,
        genre: editingBook.genre,
        status: editingBook.status,
        rating: editingBook.rating,
        image: editingBook.image,
        note: editingBook.note,
      });
    } else {
      setFormData(emptyForm);
    }
  }

 const handleChange = (event) => {
   const { name, value } = event.target;

   setFormData((prev) => ({
     ...prev,
     [name]: value,
   }));

   setErrors((prev) => ({
     ...prev,
     [name]: "",
   }));
 };

 const validateForm = () => {
   const newErrors = {};

   if (!formData.title.trim()) {
     newErrors.title = "Book title is required.";
   }

   if (!formData.author.trim()) {
     newErrors.author = "Author is required.";
   }

   if (!formData.status) {
     newErrors.status = "Please select a reading status.";
   }

   if (
     formData.rating &&
     (Number(formData.rating) < 1 || Number(formData.rating) > 5)
   ) {
     newErrors.rating = "Rating must be between 1 and 5.";
   }

   setErrors(newErrors);

   return Object.keys(newErrors).length === 0;
 };
const handleSubmit = (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  if (editingBook) {
    onUpdateBook(formData);
  } else {
    onAddBook(formData);
  }

  setFormData({
    title: "",
    author: "",
    genre: "",
    status: "",
    rating: "",
    image: "",
    note: "",
  });

  setErrors({});
};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#fffafa] border border-[#f1d9df] rounded-[28px] shadow-[0_10px_30px_rgba(214,170,180,0.18)] p-6 md:p-8 mt-8"
    >
      <h2 className="text-2xl md:text-3xl italic font-semibold text-[#9a6a76] mb-6">
        {editingBook ? "Edit Book" : "Add a New Book"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book title"
          className="w-full rounded-2xl border border-[#efd7dd] bg-[#fffdfd] px-4 py-3 outline-none text-[#7f5a64] placeholder:text-[#c5a8b0]"
        />
        {errors.title && (
          <p className="text-sm text-[#c06f83] mt-1">{errors.title}</p>
        )}

        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full rounded-2xl border border-[#efd7dd] bg-[#fffdfd] px-4 py-3 outline-none text-[#7f5a64] placeholder:text-[#c5a8b0]"
        />
        {errors.author && (
          <p className="text-sm text-[#c06f83] mt-1">{errors.author}</p>
        )}

        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full rounded-2xl border border-[#efd7dd] bg-[#fffdfd] px-4 py-3 outline-none text-[#7f5a64] placeholder:text-[#c5a8b0]"
        />

        <div className="relative w-full">
          <div className="relative w-full">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-full cursor-pointer rounded-2xl border border-[#efd7dd] bg-[#fffdfd] px-4 py-3 text-[#7f5a64] flex justify-between items-center"
            >
              <span>
                {formData.status ? formData.status : "Reading status"}
              </span>
              <span className="text-[#b08a93]">▼</span>
            </div>

            {isOpen && (
              <div className="absolute z-10 mt-2 w-full bg-[#fffafa] border border-[#efd7dd] rounded-2xl shadow-lg overflow-hidden">
                {["To Read", "Reading", "Finished"].map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, status: option }));
                      setIsOpen(false);
                    }}
                    className="px-4 py-3 hover:bg-[#f7dfe5] text-[#7f5a64] cursor-pointer transition"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#b08a93]">
            ▼
          </span>
        </div>
        {errors.status && (
          <p className="text-sm text-[#c06f83] mt-1">{errors.status}</p>
        )}

        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          className="w-full rounded-2xl border border-[#efd7dd] bg-[#fffdfd] px-4 py-3 outline-none text-[#7f5a64] placeholder:text-[#c5a8b0]"
        />
        {errors.rating && (
          <p className="text-sm text-[#c06f83] mt-1">{errors.rating}</p>
        )}

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Cover image URL"
          className="w-full rounded-2xl border border-[#efd7dd] bg-[#fffdfd] px-4 py-3 outline-none text-[#7f5a64] placeholder:text-[#c5a8b0]"
        />
      </div>

      <textarea
        name="note"
        value={formData.note}
        onChange={handleChange}
        placeholder="Write a short note about this book..."
        rows="4"
        className="w-full mt-4 rounded-2xl border border-[#efd7dd] bg-[#fffdfd] px-4 py-3 outline-none text-[#7f5a64] placeholder:text-[#c5a8b0]"
      ></textarea>

      <button className="mt-5 bg-[#e8c7d0] hover:bg-[#dfb8c4] active:scale-95 transition text-[#7d5561] font-medium px-6 py-3 rounded-full shadow-sm">
        {editingBook ? "Update Book" : "Add Book"}
      </button>
      {editingBook && (
        <button
          type="button"
          onClick={onCancelEdit}
          className="mt-3 ml-3 bg-[#f6e9ed] hover:bg-[#eedbe1] active:scale-95 transition text-[#7d5561] font-medium px-6 py-3 rounded-full shadow-sm"
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default BookForm;

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import BookForm from "../components/BookForm";
import bgImg from "../assets/background.jpg";
import EditModal from "../components/EditModal";

function Home() {
 const [books, setBooks] = useState(() => {
   const savedBooks = localStorage.getItem("books");

   return savedBooks ? JSON.parse(savedBooks) : [];
 });
  const [editingBook, setEditingBook] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const filteredBooks = books.filter((book) => {
  const matchesSearch =
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ? true : book.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  const addBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      id: Date.now(),
    };

    setBooks((prevBooks) => [bookWithId, ...prevBooks]);
  };
  const deleteBook = (bookId) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };
  const updateBook = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === updatedBook.id ? updatedBook : book,
      ),
    );

    setEditingBook(null);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Navbar />

      <div
        className="border border-[#f1d9df] rounded-[28px] shadow-[0_10px_30px_rgba(214,170,180,0.18)] p-6 md:p-10 bg-cover bg-center bg-no-repeat relative overflow-hidden"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 bg-[#fffafa]/60 rounded-[28px]"></div>
        <div className="relative z-10">
          <h1
            className="text-5xl md:text-6xl text-[#9a6a76]"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            BookTracker
          </h1>

          <p className="text-lg text-[#b08a93] mt-2 italic">
            Your personal reading journal
          </p>

          <p className="text-[#b08a93] mt-3 text-lg">
            Add, edit, track, and manage your reading list.
          </p>
        </div>
      </div>

      <BookForm onAddBook={addBook} />

      <div className="mt-8 bg-[#fffafa] border border-[#f1d9df] rounded-[28px] shadow-[0_10px_30px_rgba(214,170,180,0.18)] p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl italic font-semibold text-[#9a6a76] mb-4">
          Search Books
        </h2>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, author, or genre..."
          className="w-full rounded-2xl border border-[#efd7dd] bg-[#fffdfd] px-4 py-3 outline-none text-[#7f5a64] placeholder:text-[#c5a8b0]"
        />

        <div ref={filterRef} className="relative w-full mt-4">
          <div
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full cursor-pointer rounded-2xl border border-[#efd7dd] bg-[#fffdfd] px-4 py-3 text-[#7f5a64] flex justify-between items-center"
          >
            <span>{statusFilter}</span>
            <span className="text-[#b08a93]">▼</span>
          </div>

          {isFilterOpen && (
            <div className="absolute z-10 mt-2 w-full bg-[#fffafa] border border-[#efd7dd] rounded-2xl shadow-lg overflow-hidden">
              {["All", "To Read", "Reading", "Finished"].map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setStatusFilter(option);
                    setIsFilterOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-[#f7dfe5] text-[#7f5a64] cursor-pointer transition"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-[#fffafa] border border-[#f1d9df] rounded-[28px] shadow-[0_10px_30px_rgba(214,170,180,0.18)] p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl italic font-semibold text-[#9a6a76] mb-4">
          Book List
        </h2>

        {filteredBooks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-[#b08a93] text-lg italic">
              Your library is empty 📚
            </p>
            <p className="text-[#d3aab4] mt-2 text-sm">
              Start by adding your first book
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="border border-[#efd7dd] rounded-2xl p-4 bg-[#fffdfd] flex flex-col md:flex-row gap-4 transition hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-full md:w-32 shrink-0">
                  <img
                    src={
                      book.image ||
                      "https://via.placeholder.com/150x220?text=No+Image"
                    }
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-2xl border border-[#f1d9df]"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#8f5f6b]">
                    {book.title}
                  </h3>
                  <p className="text-[#b08a93] mt-1">Author: {book.author}</p>
                  <p className="text-[#b08a93]">Genre: {book.genre}</p>
                  <div className="mt-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        book.status === "Finished"
                          ? "bg-[#e7f6ea] text-[#5f8a68]"
                          : book.status === "Reading"
                            ? "bg-[#fdf1d8] text-[#a67c38]"
                            : "bg-[#f8dfe6] text-[#9a6a76]"
                      }`}
                    >
                      {book.status}
                    </span>
                  </div>
                  <p className="text-[#b08a93] mt-2">
                    Rating: ⭐ {book.rating}
                  </p>
                  <p className="text-[#b08a93] mt-2 italic">
                    {book.note ? `“${book.note}”` : "No note added yet."}
                  </p>

                  <button
                    onClick={() => handleEditBook(book)}
                    className="mt-4 mr-3 bg-[#eadde7] hover:bg-[#e1d0dc] text-[#8f5f6b] px-4 py-2 rounded-full text-sm font-medium transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBook(book.id)}
                    className="mt-4 bg-[#f4d7dd] hover:bg-[#edc5cf] text-[#8f5f6b] px-4 py-2 rounded-full text-sm font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <EditModal isOpen={!!editingBook} onClose={() => setEditingBook(null)}>
        <BookForm
          editingBook={editingBook}
          onUpdateBook={updateBook}
          onCancelEdit={() => setEditingBook(null)}
        />
      </EditModal>
    </div>
  );
}

export default Home;

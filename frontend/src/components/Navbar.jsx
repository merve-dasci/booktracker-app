function Navbar() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-semibold italic text-[#8f5f6b]">
          My Library
        </h2>

        <p className="text-sm text-[#b08a93] mt-1">
          Keep track of the books you want to read.
        </p>
      </div>

      <div className="bg-[#f7dfe5] text-[#9a6a76] px-4 py-2 rounded-full text-sm font-medium shadow-sm">
        BookTracker
      </div>
    </div>
  );
}

export default Navbar;

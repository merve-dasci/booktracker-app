/**
 * @typedef {Object} Book
 * @property {number} id - Unique identifier (timestamp-based)
 * @property {string} title - Book title (required)
 * @property {string} author - Author name (required)
 * @property {string} genre - Book genre
 * @property {"To Read" | "Reading" | "Finished"} status - Reading status (required)
 * @property {number|string} rating - Rating from 1 to 5
 * @property {string} image - Cover image URL
 * @property {string} note - Personal note about the book
 */

/**
 * Empty book template used for form initialization
 * @type {Omit<Book, 'id'>}
 */
export const emptyBook = {
  title: "",
  author: "",
  genre: "",
  status: "",
  rating: "",
  image: "",
  note: "",
};

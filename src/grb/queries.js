// retrieve all records from the "Book" table.
const getBooks = 'SELECT * FROM "Book"';

// retrieve all records from the "View_Wishlist_Info" view.
const getWishlist = 'SELECT * FROM "View_Wishlist_Info"';

// retrieve a book record by its ID from the "Book" table.
const getBookById = 'SELECT * FROM "Book" WHERE "Book ID" = $1';

// retrieve book records by the author's name from the "View_Book_Info" view.
const getBookByAuthor = 'SELECT * FROM "View_Book_Info" WHERE "Author_Name" = $1';

// check if a book with a specific name exists in the "Book" table
const checkBook = 'SELECT b FROM "Book" b WHERE b."Book Name" = $1';

// check if a specific book is in a specific wishlist in the "Book_Wishlist" table.
const checkBookInWishlist = 'SELECT 1 FROM "Book_Wishlist" WHERE "Wishlist ID" = $1 AND "Book ID" = $2';

// create a new wishlist for a specific account and return the new "Wishlist ID".
const createWishlist = 'INSERT INTO "Wishlist" ("Account ID") VALUES ($1) RETURNING "Wishlist ID"';

// add a book to a wishlist in the "Book_Wishlist" table.
const addBookToWishlist = 'INSERT INTO "Book_Wishlist" ("Wishlist ID", "Book ID") VALUES ($1, $2)';

// add a new book to the "Book" table.
const addBook = 
    'INSERT INTO "Book" ("Book Name", "Publication Year", "Pages", "Price") VALUES ($1, $2, $3, $4)';

// update the details of a book in the "Book" table by its ID.
const updateBook = 
    'UPDATE "Book" SET "Book Name" = $1, "Publication Year" = $2, "Pages" = $3, "Price" = $4 WHERE "Book ID" = $5';

// delete a book from the "Book" table by its ID.
const removeBook = 'DELETE FROM "Book" WHERE "Book ID" = $1';

// remove a book from a wishlist in the "Book_Wishlist" table by wishlist ID and book ID.
const removeBookFromWishlist = 'DELETE FROM "Book_Wishlist" WHERE "Wishlist ID" = $1 AND "Book ID" = $2';

// delete a wishlist from the "Wishlist" table by its ID.
const removeWishlist = 'DELETE FROM "Wishlist" WHERE "Wishlist ID" = $1';


module.exports = {
    getBooks,
    getWishlist,
    getBookById,
    getBookByAuthor,
    checkBook,
    checkBookInWishlist,
    createWishlist,
    addBook,
    addBookToWishlist,
    updateBook,
    removeBook,
    removeBookFromWishlist,
    removeWishlist,
};
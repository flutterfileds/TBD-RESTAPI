const pool = require('../../db');
const queries = require('./queries');

const getBooks = (req, res) => {
    pool.query(queries.getBooks, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getWishlist = (req, res) => {
    pool.query(queries.getWishlist, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getBookById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBookById, [id], (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
};

const getBookByAuthor = (req, res) => {
    const bookAuthor = req.params.bookAuthor;
    pool.query(queries.getBookByAuthor, [bookAuthor], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const createWishlist = (req, res) => {
    const { accountId } = req.body;
    pool.query(queries.createWishlist, [accountId], (error, results) => {
        if (error) {
            console.error('Error creating wishlist:', error);
            return res.status(500).send('Error creating wishlist.');
        }
        const wishlistId = results.rows[0]['Wishlist ID'];
        res.status(201).json({
            message: 'Wishlist created successfully.',
            wishlistId: wishlistId
        });
    });
};

const addBookToWishlist = (req, res) => {
    const { wishlistId, bookId } = req.body;
    pool.query(queries.addBookToWishlist, [wishlistId, bookId], (error, results) => {
        if (error) {
            console.error('Error adding book to wishlist:', error);
            return res.status(500).send('Error adding book to wishlist.');
        }
        res.status(201).send('Book added to wishlist successfully.');
    });
};

const addBook = (req, res) => {
    const { bookName, pubyear, pages, price } = req.body;
    //check if bookName exists
    pool.query(queries.checkBook, [bookName], (error, results) =>{
        if (error) {
            console.error('Error checking book existence:', error);
            return res.status(500).send('Error checking book existence.');
        }

        if (results.rows.length) {
            res.send("Book Name already exists.");
        }

        //add Book to Database
        pool.query(
            queries.addBook, 
            [bookName, pubyear, pages, price], 
            (error, results) =>{
                if (error) {
                    console.error('Error adding book:', error);
                    return res.status(500).send('Error adding book.');
                }
            res.status(201).send("Book Added Successfully.");
        })
    })
}

const updateBook = (req, res) => {
    const id = parseInt(req.params.id);
    const { bookName, pubyear, pages, price } = req.body;
    
    //check if book exists
    pool.query(queries.getBookById, [id], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound) {
            return res.status(404).send('Book does not exist in the database');
        }

        //update book details
        pool.query(queries.updateBook, [ bookName, pubyear, pages, price, id], (error, results) => {
            if (error) {
                console.error('Error updating book:', error);
                return res.status(500).send('Error updating book.');
            }
            res.status(200).send('Book updated successfully.');
        });
    });
};

const removeBook = (req, res) => {
    const id = parseInt(req.params.id);

    //check if book exists
    pool.query(queries.getBookById, [id], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound) {
            return res.status(404).send('Book does not exist in the database');
        }

        //remove book from database
        pool.query(queries.removeBook, [bookName], (error, results) =>{
            if (error) throw error;
            res.status(200).send("Book Removed Successfully.");
        })
    })
}

const removeBookFromWishlist = (req, res) => {
    const { wishlistId, bookId } = req.params;

    // check if the book exists in the wishlist
    pool.query(queries.checkBookInWishlist, [wishlistId, bookId], (error, results) => {
        if (error) {
            console.error('Error checking book in wishlist:', error);
            return res.status(500).send('Error checking book in wishlist.');
        }

        const noBookFoundInWishlist = !results.rows.length;
        if (noBookFoundInWishlist) {
            return res.status(404).send('Book does not exist in the wishlist.');
        }

        // remove the book from the wishlist
        pool.query(queries.removeBookFromWishlist, [wishlistId, bookId], (error, results) => {
            if (error) {
                console.error('Error removing book from wishlist:', error);
                return res.status(500).send('Error removing book from wishlist.');
            }
            res.status(200).send('Book removed from wishlist successfully.');
        });
    });
};

const removeWishlist = (req, res) => {
    const wishlistId = req.params.wishlistId;
    pool.query(queries.removeWishlist, [wishlistId], (error, results) => {
        if (error) {
            console.error('Error removing wishlist:', error);
            return res.status(500).send('Error removing wishlist.');
        }
        res.status(200).send('Wishlist removed successfully.');
    });
};

module.exports = {
    getBooks,
    getWishlist,
    getBookById,
    getBookByAuthor,
    createWishlist,
    addBook,
    addBookToWishlist,
    updateBook,
    removeBook,
    removeBookFromWishlist,
    removeWishlist,
};
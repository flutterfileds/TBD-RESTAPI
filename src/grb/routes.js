const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get('/', controller.getBooks);
router.get('/wishlist', controller.getWishlist);
router.get('/book/:id', controller.getBookById);
router.get('/author/:bookAuthor',controller.getBookByAuthor);

router.post('/addbook', controller.addBook);
router.post('/wishlist', controller.createWishlist);
router.post('/wishlist/book', controller.addBookToWishlist);

router.put('/book/:id')

router.delete('/book/:id', controller.removeBook);
router.delete('/wishlist/:wishlistId', controller.removeWishlist);
router.delete('/wishlist/:wishlistId/book/:bookId', controller.removeBookFromWishlist);

module.exports = router;
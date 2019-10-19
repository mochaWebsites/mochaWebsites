const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');
const adminController = require('../controllers/adminController');

router.get('/admin', adminController.renderLogin);
router.post('/admin', adminController.postLogin);

router.get('/admin/blog', isAdmin, adminController.renderBlogAddForm);
router.post('/admin/blog/add', isAdmin, adminController.postAddBlog);
// router.post('/admin/blog/edit', isAdmin, adminController.getBlogEditForm);

// router.get('/admin/genre', isAdmin, adminController.getgenreForm);
router.post('/admin/genre/add', isAdmin, adminController.postAddGenre);
// router.post('/admin/genre/edit', isAdmin, adminController.editGenre);
// router.post('/admin/genre/delete', isAdmin, adminController.deleteGenre);

module.exports = router;
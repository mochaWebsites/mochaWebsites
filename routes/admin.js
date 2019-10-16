const express = require('express');
const router = express.Router();

const isAdmin = require('../middleware/isAdmin');
const adminController = require('../controllers/adminController');

router.get('/admin', adminController.renderLogin);
router.post('/admin', adminController.postLogin);

router.get('/admin/blog', isAdmin, adminController.renderBlogAddForm);
router.post('/admin/blog/add', isAdmin, adminController.postAddBlog);
// router.post('/admin/blog/edit', isAdmin, adminController.getBlogEditForm);

// router.get('/admin/category', isAdmin, adminController.getCategoryForm);
// router.post('/admin/category/add', isAdmin, adminController.addCategory);
// router.post('/admin/category/edit', isAdmin, adminController.editCategory);
// router.post('/admin/category/delete', isAdmin, adminController.deleteCategory);

module.exports = router;
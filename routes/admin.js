const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/admin', adminController.renderLogin);
router.post('/admin', adminController.postLogin);

router.get('/admin/blog', adminController.renderBlogAddForm);
router.post('/admin/blog/add', adminController.addBlog);
router.post('/admin/blog/edit', adminController.renderBlogEditForm);


router.get('/admin/category', adminController.renderCategoryForm);
router.post('/admin/category/add', adminController.addCategory);
router.post('/admin/category/edit', adminController.editCategory);
router.post('/admin/category/delete', adminController.deleteCategory);

module.exports = router;
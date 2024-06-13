const express = require('express');

const router = express.Router();

const userController = require('../Controllers/userController');
const adminController = require('../Controllers/adminController');

router.get('/', userController.homePage);

router.get('/about', userController.aboutPage);

router.get('/contact', userController.contactPage);

// router.get('/accountType', userController.accountType);

// router.get('/privacy', userController.privacyPage);

router.get('/faq', userController.faqPage);

router.get('/register', userController.registerPage);
router.post('/register', userController.register_post);

router.get('/login', userController.loginPage);
router.post('/login', userController.login_post);

router.get('/loginAdmin', userController.loginAdmin);
router.post('/loginAdmin', adminController.loginAdmin_post)

router.get('/logout', userController.logout_get)

module.exports = router;
const express = require('express');
const multer = require('multer');
const router = express.Router();

const userController = require('../Controllers/userController');

//MULTER

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './upload'); //the folder to which the file is to be saved
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname); //filename: name of the file within the destination . originalname: name of file on the user's computer
  },
})

const upload = multer({
  storage: storage
})


router.get('/dashboard',userController.dashboardPage);

router.get('/account/:id',userController.accountPage);

router.get('/deposit', userController.depositPage);
router.post('/deposit/:id',upload.single('image'), userController.depositPage_post);

router.get('/depositHistory/:id',userController.depositHistory);

router.get('/widthdraw',userController.widthdrawPage);
router.post('/widthdraw/:id',userController.widthdrawPage_post);

router.get('/widthdrawHistory/:id',userController.widthdrawHistory);

router.get('/buyCrypto', userController.buyCrypto)

module.exports = router;


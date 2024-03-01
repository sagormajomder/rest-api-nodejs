const express = require('express');
const multer = require('multer');
const {
  getAllUser,
  getOneUser,
  getUserRegister,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const router = express.Router();

// Uload Files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

router.get('/', getAllUser);
router.get('/:id([a-z0-9-]{36})', getOneUser);
router.get('/register', getUserRegister);
router.post('/', upload.single('image'), createUser);
router.patch('/:id', upload.single('image'), updateUser);
router.delete('/:id', deleteUser);

module.exports = router;

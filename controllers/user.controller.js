const User = require('./../models/user.model');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      result: 'Success',
      message: 'All users data are available',
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(500).json({
      result: 'Error',
      message: 'Something broke ' + error.message,
    });
  }
};
const getOneUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    res.status(200).json({
      result: 'Success',
      message: 'User data are available',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      result: 'Error',
      message: 'Something broke ' + error.message,
    });
  }
};

const getUserRegister = async (req, res) => {
  try {
    const filePath = path.join(__dirname + './../views/index.html');
    res.status(200).sendFile(filePath);
  } catch (error) {
    res.status(500).json({
      result: 'Error',
      message: 'Something broke ' + error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      age: Number(req.body.age),
      image: req.file.filename,
    });
    await newUser.save();

    res.status(201).json({
      result: 'Success',
      message: 'user data are posted',
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      result: 'Error',
      message: 'Something broke ' + error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    req.body.name ? (user.name = req.body.name) : user.name;
    req.body.email ? (user.email = req.body.email) : user.email;
    req.body.age ? (user.age = Number(req.body.age)) : user.age;
    req.file.filename ? (user.image = req.file.filename) : user.image;

    await user.save();

    res.status(200).json({
      result: 'Success',
      message: 'users data are updated',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      result: 'Error',
      message: 'Something broke ' + error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ id: req.params.id });

    res.status(200).json({
      result: 'Success',
      message: 'user data are deleted',
    });
  } catch (error) {
    res.status(500).json({
      result: 'Error',
      message: 'Something broke ' + error.message,
    });
  }
};

module.exports = {
  getAllUser,
  getOneUser,
  getUserRegister,
  createUser,
  updateUser,
  deleteUser,
};

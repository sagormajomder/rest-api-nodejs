const mongoose = require('mongoose');
const config = require('./config');
const database = config.db.url;

const db_connect = async () => {
  try {
    await mongoose.connect(database);
    console.log(`DB is connect`);
  } catch (error) {
    console.log(`DB is not Connected ${error.message}`);
  }
};

module.exports = db_connect;

const mongoose = require("mongoose");

const db = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error conecting database");
  }
};

module.exports = db;

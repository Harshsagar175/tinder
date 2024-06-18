const mongoose = require("mongoose");

const connectDb = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  if (connection.STATES.connected) console.log("Connected to the database");
  if (connection.STATES.disconnected)
    console.log("Error connecting to the database");
  return;
};

module.exports = { connectDb };

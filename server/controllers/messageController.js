const Messages = require("../db/models/Message");
const mongoose = require("mongoose");

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    console.error("Error fetching messages: ", ex);
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    // console.log("Received data:", { from, to, message }); // Log the received data

    if (!from || !to || !message) {
      return res.status(400).json({ msg: "Invalid data" });
    }

    const data = await Messages.create({
      message: message,
      users: [from, to],
      sender: new mongoose.Types.ObjectId(from),
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    console.error("Error adding message: ", ex);
    next(ex);
  }
};

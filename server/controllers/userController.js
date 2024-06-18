const { User } = require("../db/models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addToFav = async (req, res) => {
  const myId = req.id;
  const { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(
      { _id: myId },
      {
        $push: { favourites: id },
      }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Added to favourites" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const addToDis = async (req, res) => {
  const myId = req.id;
  const { id } = req.params;
  try {
    let user = await User.findByIdAndUpdate(
      { _id: myId },
      {
        $push: { disliked: id },
      }
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Added to disliked" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getFromFav = async (req, res) => {
  const myId = req.id;
  try {
    let user = await User.findById({ _id: myId }).populate({
      path: "favourites",
      select: "name email profile _id",
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: user.favourites });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUsers, addToDis, addToFav,getFromFav };

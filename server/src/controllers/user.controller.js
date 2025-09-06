const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('listedProducts')
      .populate('orderedProducts');
    if (!user) return res.status(404).json({ message: "User not found" });
    console.log("User profile fetched:", user.listedProducts);
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      listedCount: user.listedProducts,      // <-- Active listings count
      purchasedCount: user.orderedProducts,  // <-- Purchased items count
      avatarUrl: user.avatarUrl || "",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      avatarUrl: user.avatarUrl || "",
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};
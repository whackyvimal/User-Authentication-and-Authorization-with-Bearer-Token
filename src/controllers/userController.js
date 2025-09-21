exports.getMe = async (req, res, next) => {
  try {
    // req.user is attached by auth middleware
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    // Return basic user info
    const { id, username, email } = req.user;
    return res.json({ id, username, email });
  } catch (err) {
    next(err);
  }
};

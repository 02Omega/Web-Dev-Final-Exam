const express = require('express');
const router = express.Router();

const CREDENTIALS = {
  username: 'reader',
  password: 'reader123',
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    return res.status(200).json({ message: 'Login successful!' });
  }
  return res.status(401).json({ message: 'Invalid username or password.' });
});

module.exports = router;

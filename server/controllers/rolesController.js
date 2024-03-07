const Role = require('../models/Roles');

const createRole = async (req, res) => {
  const newRole = new Role(req.body);

  try {
    newRole.save();
    res.status(200).json('Created role');
  } catch (error) {
    res.status(500).json('Failed to create the role', error);
  }
};

module.exports = {
    createRole
}
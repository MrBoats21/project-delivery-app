const md5 = require('md5');
const { User } = require('../database/models');

const checkIfExists = async ({ name, email }) => {
    const verifyName = await User.findOne({
        where: { name },
    });
    const verifyEmail = await User.findOne({
        where: { email },
    });

    if (verifyName || verifyEmail) {
        return { type: 404 };
    }

    return { type: 200 };
  };

const newUser = async ({ name, email, password }) => {
  const newPassword = md5(password);
  const response = await User.create({
    name,
    email,
    password: newPassword });
    console.log(response);
    return { type: 201, message: response };
};

module.exports = {
    newUser, checkIfExists,
};
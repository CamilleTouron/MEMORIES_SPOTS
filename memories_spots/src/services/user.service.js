const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/user.data.json');

const userService = {
  getUserByEmail(email) {
    try {
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
      return usersData.users.find((user) => user.email === email);
    } catch (error) {
      console.error('Error reading users JSON file:', error);
      return null;
    }
  },

  getUserById(userId) {
    try {
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
      return usersData.users.find((user) => user.id === userId);
    } catch (error) {
      console.error('Error reading users JSON file:', error);
      return null;
    }
  },

  createUser(name, email, password) {
    try {
      const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
      const id = usersData.users.length + 1;
      const newUser = {
        id,
        name,
        email,
        password,
      };
      usersData.users.push(newUser);
      fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), 'utf8');
      return newUser;
    } catch (error) {
      console.error('Error reading or writing users JSON file:', error);
      return null;
    }
  },
};

module.exports = userService;

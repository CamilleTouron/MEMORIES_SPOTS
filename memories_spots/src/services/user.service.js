const userService = {
  getUserByEmail(email) {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || { users: [] };
    return usersData.users.find((user) => user.email === email);
  },

  getUserById(userId) {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || { users: [] };
    return usersData.users.find((user) => user.id === userId);
  },

  verifyUser(email, password) {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || { users: [] };
    const userToFind = usersData.users.find((user) => user.email === email);
    if (userToFind && userToFind.password === password) {
      return userToFind;
    }
    return null;
  },

  createUser(name, email, password) {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || { users: [] };
    const id = usersData.users.length + 1;
    const newUser = {
      id,
      name,
      email,
      password,
    };
    usersData.users.push(newUser);
    localStorage.setItem('usersData', JSON.stringify(usersData));
    return newUser;
  },
};

export default userService;

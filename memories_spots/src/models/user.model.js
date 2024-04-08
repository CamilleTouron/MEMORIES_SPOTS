const { encrypt } = require('../services/encrypt.service');

const User = class {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = encrypt(password);
  }

  static fromJson(json) {
    return new User(json.id, json.name, json.email, json.password);
  }

  static toJson(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  static verifyPassword(user, password) {
    const encryptedPassword = encrypt(password);
    return encryptedPassword === user.password;
  }
};

module.exports = User;

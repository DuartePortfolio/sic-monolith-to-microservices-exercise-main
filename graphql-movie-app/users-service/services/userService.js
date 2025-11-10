

const usersData = require("../data/usersData");
const { logger } = require('../utils/logger');

exports.createUser = (name, email, password, role) => {
  logger.debug({name, email, password, role}, "Attempting to create user");
  if (!name || !email || !password || !role) {
    logger.warn({name, email, role}, "Failed to create user: Missing name, email, password or role");
    throw new Error("Name, email, password and role are required");
  }
  const existingUser = usersData.find((u) => u.email === email);
  logger.info({email}, "Checking if user already exists");
  if (existingUser) {
    logger.warn({email}, "Failed to create user: Email already registered");
    throw new Error("Email already registered");
  }
  if (role !== 'admin' && role !== 'user') {
    logger.warn({role}, "Failed to create user: Invalid role");
    throw new Error("Role must be either 'admin' or 'user'");
  }
  const newUser = {
    id: usersData.length + 1,
    name,
    email,
    password,
    role
  };

  usersData.push(newUser);
  logger.info({email}, "User created successfully");
  return newUser;
};

exports.deleteUser = (id) => {
  logger.debug({id}, "Attempting to delete user");
  const userIndex = usersData.findIndex((u) => u.id === id);
  logger.info({id}, "Finding user for deletion");
  if (userIndex !== -1) {
    usersData.splice(userIndex, 1);
    logger.info({id}, "User deleted successfully");
    return true;
  }
  logger.warn({id}, "Failed to delete user: User not found");
  return false;
};

exports.updateUser = (id, name, email) => {
  logger.debug({id, name, email}, "Attempting to update user");
  const user = usersData.find((u) => u.id === id);
  logger.info({id}, "Finding user for update");
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    logger.info({id}, "User updated successfully");
    return user;
  }
  logger.warn({id}, "Failed to update user: User not found");
  return null;
};


exports.getAllUsers = () => {
  logger.info("Retrieving all users");
  return usersData;
};

exports.getUserById = (id) => {
  logger.info({id}, "Finding user by ID");
  return usersData.find((u) => u.id === id);
};

exports.loginUser = (email, password) => {
  logger.debug({ email }, "Attempting to login user");
  const user = usersData.find((u) => u.email === email);
  if (!user) {
    logger.warn({ email }, "User login failed: User not found");
    return null;
  }

  const passwordMatches = user.password === password;

  if (!passwordMatches) {
    logger.warn({ email }, "User login failed: invalid password");
    return null;
  }

  logger.info({ email }, "User login successful");
  return user;
};



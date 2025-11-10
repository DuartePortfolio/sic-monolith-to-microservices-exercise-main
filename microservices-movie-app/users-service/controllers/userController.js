const userService = require("../services/userService");
const authService = require("../services/authService");


``
exports.getAllUsers = (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.responses[200] = {
      description: 'List of all users',
      schema: { $ref: '#/definitions/GetUser' }
    }
  */
  const users = userService.getAllUsers();
  res.json(users);
};

exports.getUserById = (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'User found',
      schema: { $ref: '#/definitions/GetUser' }
    }
    #swagger.responses[404] = { description: 'User not found' }
  */
  const userId = parseInt(req.params.id);
  const user = userService.getUserById(userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

exports.createUser = (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = userService.createUser(name, email, password);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.message === "Email already registered") {
      res.status(409).json({ error: err.message });
    } else {
      res.status(400).json({ error: err.message });
    }
  }

  /*  
    #swagger.tags = ['Users'] 
    #swagger.parameters['body'] = { 
    in: 'body', 
    description: 'New user object', 
    required: true, 
    schema: { $ref: '#/definitions/CreateUser' } 
    } 
    #swagger.responses[201] = { description: 'User created successfully', schema: { 
    $ref: '#/definitions/GetUser'} } 
    #swagger.responses[409] = { description: 'Email already exists' } 
  */ 
};

exports.deleteUser = (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'integer'
    }
    #swagger.responses[204] = { description: 'User deleted successfully' }
    #swagger.responses[404] = { description: 'User not found' }
  */
  const userId = parseInt(req.params.id);
  const deleted = userService.deleteUser(userId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

exports.updateUser = (req, res) => {
  /*
    #swagger.tags = ['Users']
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'User ID',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated user object',
      required: true,
      schema: { $ref: '#/definitions/UpdateUser' }
    }
    #swagger.responses[200] = {
      description: 'User updated successfully',
      schema: { $ref: '#/definitions/GetUser' }
    }
    #swagger.responses[404] = { description: 'User not found' }
  */
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const user = userService.updateUser(userId, name, email);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password in request body' });
  }

  try {
    const user = await userService.loginUser(email, password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const { password: _p, ...publicUser } = user;
    const token = authService.signToken({ id: publicUser.id, email: publicUser.email, role: publicUser.role || 'user' });
    return res.json({ user: publicUser, token });
  } catch (err) {
    return res.status(500).json({ error: 'Internal error' });
  }
};
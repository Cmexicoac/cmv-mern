const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try{
        console.log("Intentando registrar un usuario");
        const user = new User(req.body);
        await user.save();
        res.status(201).send({user});

    }
    catch (error){
        res.status(400).send(error);
    }

};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      console.log(user);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      // User authenticated successfully, generate a JWT token
      const token = jwt.sign(
        { id: user._id, email: user.email, rol: user.rol, nombre: user.nombre, matricula: user.matricula, foto: user.foto },
        'CMVmern', // replace with env later... your secret key
        { expiresIn: '1h' } // token expiration time
      );
  
      res.status(200).json({ message: "Login successful", token: token  });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error during login", error: error.message });
    }
};

const deleteAllData = async (req, res) => {
    try {
        await User.deleteMany({});
        
        res.status(200).json({ message: "Todos los datos han sido borrados." });
    } catch (error) {
        res.status(500).json({ message: "Error during data deletion", error: error.message });
    }
};

module.exports = {
    registerUser,
    getUsers,
    loginUser,
    deleteAllData
};
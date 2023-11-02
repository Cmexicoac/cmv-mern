const User = require("../models/User.js");

const registerUser = async (req, res) => {
  try {
    console.log("Intentando registrar un usuario");
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los usuarios", error: error.message });
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

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { matricula, grado, numeroDeLista, email, picture } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is missing" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (matricula) user.matricula = matricula;
    if (grado) user.grado = grado;
    if (numeroDeLista) user.numeroDeLista = numeroDeLista;
    if (picture) user.foto = picture;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during user update", error: error.message });
  }
};

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  updateUser,
};

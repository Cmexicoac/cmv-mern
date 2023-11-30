const Alumno = require("../models/Alumno");
const User = require("../models/User.js");

const registerAlumno = async (req, res) => {
  try {
    console.log("Intentando registrar un Alumno");
    const alumno = new Alumno(req.body);
    await alumno.save();
    res.status(201).send({ alumno });
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.status(200).json(alumnos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error obteniendo los alumnos", error: error.message });
  }
};

const deleteAllData = async (res) => {
  try {
    await Alumno.deleteMany({});

    res.status(200).json({ message: "Todos los datos han sido borrados." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during data deletion", error: error.message });
  }
};

const getAlumnoContra = async (req, res) => {
  try {
    const { grado } = req.query; // Obtener el grado del parámetro de consulta

    // Buscar todos los alumnos con el grado especificado
    const alumnos = await Alumno.find({ grado });

    // Obtener las matrículas de esos alumnos
    const matriculas = alumnos.map((alumno) => alumno._id);

    // Buscar en la colección de usuarios usando esas matrículas
    const usuarios = await User.find(
      {
        matricula: { $in: matriculas },
        rol: "alumno",
      },
      "matricula password"
    );

    const passwordsList = usuarios.map((usuario) => ({
      matricula: usuario.matricula,
      password: usuario.password,
    }));

    res.status(200).json(passwordsList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

module.exports = {
  registerAlumno,
  getAlumnos,
  deleteAllData,
  getAlumnoContra,
};

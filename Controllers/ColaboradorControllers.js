import Colaborador from "../Models/Colaborador.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//? Crear un nuevo colaborador
const createColaborador = async (req, res) => {
  try {
    //Destructurar
    const {
      nombres,
      apellidos,
      email,
      fullname,
      telefono,
      rol,
      genero,
      n_doc,
      password,
      estado,
      pais,
    } = req.body;

    // Generar un hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10); // El segundo argumento es el número de rondas de hashing

    const newColaborador = await Colaborador.create({
      nombres,
      apellidos,
      email,
      fullname,
      telefono,
      rol,
      genero,
      n_doc,
      password: hashedPassword,
      estado,
      pais,
    });

    if (newColaborador) {
      return res.json({
        message: "Colaborador creado exitosamente",
        data: newColaborador,
      });
    }
  } catch (error) {
    // Manejo de error específico para correo electrónico duplicado
    if (error.code === 11000 && error.keyPattern.email) {
      return res.status(400).json({
        message: "El correo electrónico ya está registrado",
        data: {},
      });
    }

    console.error(error);
    res.status(500).json({
      message: "Algo salió mal",
      data: {},
    });
  }
};

//? login colaborador
const loginColaborador = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el colaborador por su correo electrónico
    const colaborador = await Colaborador.findOne({ email });

    // Si no se encuentra el colaborador, devuelve un mensaje de error
    if (!colaborador) {
      return res.status(404).json({
        message: "El correo electrónico no está registrado",
        data: {},
      });
    }

    // Verificar si el estado del colaborador es true
    if (!colaborador.estado) {
      return res.status(403).json({
        message: "Ya no tienes acceso al sistema",
        data: {},
      });
    }

    // Verificar la contraseña proporcionada con la almacenada en la base de datos
    const isPasswordValid = await bcrypt.compare(
      password,
      colaborador.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Los datos de inicio de sesión son incorrectos",
        data: {},
      });
    }

    // Aquí puedes generar un token de autenticación (usando JWT, por ejemplo) y enviarlo en la respuesta
    const token = jwt.sign(
      { userId: colaborador._id },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );

    return res.json({
      message: "Inicio de sesión exitoso",
      token: token,
      data: colaborador,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Algo salió mal",
      data: {},
    });
  }
};

//? Listar colaboradores
const listColaborador = async (req, res) => {
  try {
    const colaboradores = await Colaborador.find();
    return res.json({
      message: "Lista de colaboradores",
      data: colaboradores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Algo salió mal",
      data: {},
    });
  }
};






export { createColaborador, loginColaborador, listColaborador };

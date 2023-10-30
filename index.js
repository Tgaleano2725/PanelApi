import express from 'express';
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import testsRoutes from "./Routes/tests.js";
import cors from 'cors';
const port = process.env.PORT || 5000;

// Crear el servidor
const app = express();

// Conectar a la base de datos
connectDB();



app.use(express.json());

// BodyParser
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));


app.use(cors());



// Rutas
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
app.use("/api", testsRoutes);
//app.use("/api", colaborador_routes);


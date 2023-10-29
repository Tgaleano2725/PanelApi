import express from 'express';
import connectDB from "./config/db.js";

// Conectar a la base de datos
connectDB();

// Crear el servidor
const app = express();
import cors from 'cors';
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}
);

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
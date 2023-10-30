import mongoose from 'mongoose';

const ColaboradorSchema = new mongoose.Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    fullname: { type: String, required: false },
    telefono: { type: String, required: false },
    rol: { type: String, required: true },
    genero: { type: String, required: true },
    n_doc: { type: String, required: false },
    password: { type: String, required: true },
    estado: { type: Boolean,default: true, required: true },
    pais : { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
});


const Colaborador = mongoose.model('Colaborador', ColaboradorSchema);

export default Colaborador;



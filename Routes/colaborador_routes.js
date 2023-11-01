import express from 'express';
import {createColaborador, loginColaborador, listColaborador} from '../Controllers/ColaboradorControllers.js';
import { verificarToken } from '../Middlewares/jwt.js';


const router = express.Router();

router.post('/create_colaborador', verificarToken, createColaborador);
router.post('/login_colaborador', loginColaborador);
router.get('/list_colaborador',verificarToken, listColaborador);


export default router;
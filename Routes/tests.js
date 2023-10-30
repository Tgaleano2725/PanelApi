import express from 'express';
import {prueba_test} from '../Controllers/testController.js';

const router = express.Router();

router.get('/test', prueba_test);


export default router;
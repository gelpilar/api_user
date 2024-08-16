import express from 'express';

import { deleteUser, getForNamer, getUser, getUsers, loginUser, postUser, putUser } from '../controllers/userController.js';
const router = express.Router();

// Ruta para registrar un nuevo usuario
//router.post("/user/register", postUser)
/**
 * Login
 * Ver recetas
 * Ver comentario
 */

router.post("/login",loginUser);
router.post("/register",postUser)
export default router ;
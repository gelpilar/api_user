// routes/userRoutes.js
import express from 'express';
import {postUser } from '../controllers/userController.js';
import { deleteUser, getForNamer, getUser, getUsers, loginUser, putUser } from '../controllers/userController.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
//router.post("/user/register", postUser)


export default router;

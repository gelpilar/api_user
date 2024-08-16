import express from 'express';

import { deleteUser, getForNamer, getUser, getUsers, loginUser, putUser } from '../controllers/userController.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
//router.post("/user/register", postUser)


router.get("/users",getUsers);
router.get("/user/:id",getUser);
router.get("/userName",getForNamer);
router.put("/user/:id",putUser);
router.delete("/user/:id",deleteUser)

export default router;
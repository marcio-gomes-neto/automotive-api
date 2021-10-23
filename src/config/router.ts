import express from "express";

import AddUserController from "../api/application/user/controller/addUserController";
import DisableUserController from "../api/application/user/controller/disableUserController";
import findAllUsersController from "../api/application/user/controller/findAllUsersController";
import findUserByCpfController from "../api/application/user/controller/findUserByCpfController";
import findUserByIdController from "../api/application/user/controller/findUserByIdController";
import UpdateUserController from "../api/application/user/controller/updateUserController";

import { routerAdapter } from "./adapters/RouterAdapter";
const router = express.Router()

router.get('/user/:id', routerAdapter(new findUserByIdController()));
router.get('/user/cpf/:cpf',routerAdapter(new findUserByCpfController))
router.get('/user', routerAdapter(new findAllUsersController()));
router.post('/user/disable/:cpf', routerAdapter(new DisableUserController))
router.post('/user/update/:cpf', routerAdapter(new UpdateUserController()))
router.post('/user', routerAdapter(new AddUserController()));

export default router
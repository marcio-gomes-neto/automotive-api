import express from "express";
import AddUserController from "../api/application/user/controller/addUserController";
import { routerAdapter } from "./adapters/RouterAdapter";
const router = express.Router()

router.post('/user', routerAdapter(new AddUserController()));

export default router
import express from "express";
import addClaimNoOutsourceController from "../api/application/claims/controller/addClaimNoOutsourceController";
import addClaimWithOutsourceController from "../api/application/claims/controller/addClaimWithOutsourceController";
import findAllClaimsController from "../api/application/claims/controller/findAllClaimsController";
import findClaimByIdController from "../api/application/claims/controller/findClaimsByIdController";
import findOutSourceClaimsController from "../api/application/claims/controller/findOutsourceClaimsController";
import findUserClaimsController from "../api/application/claims/controller/findUserClaimsController";
import AddClaimNoOutsourceUseCase from "../api/application/claims/useCase/addClaimNoOutsourceUseCase";

import findAllOutsourcesController from "../api/application/outsource/controller/findAllOutsourcesController";
import findOutsourceByCpfController from "../api/application/outsource/controller/findOutsourceByCpfController";
import findOutsourceByIdController from "../api/application/outsource/controller/findOutsourceByIdController";
import UpdateOutsourceController from "../api/application/outsource/controller/updateOutsourceController";

import AddUserController from "../api/application/user/controller/addUserController";
import DisableUserController from "../api/application/user/controller/disableUserController";
import EnableUserController from "../api/application/user/controller/enableUserController";
import findAllUsersController from "../api/application/user/controller/findAllUsersController";
import findUserByCpfController from "../api/application/user/controller/findUserByCpfController";
import findUserByIdController from "../api/application/user/controller/findUserByIdController";
import UpdateUserController from "../api/application/user/controller/updateUserController";

import { routerAdapter } from "./adapters/RouterAdapter";
const router = express.Router()
// USER ROUTES ------------------------------------------------------------------------------------------------------------
router.get('/user/:id', routerAdapter(new findUserByIdController()));
router.get('/user/cpf/:cpf',routerAdapter(new findUserByCpfController))
router.get('/user', routerAdapter(new findAllUsersController()));

router.post('/user/enable/:cpf', routerAdapter(new EnableUserController))
router.post('/user/disable/:cpf', routerAdapter(new DisableUserController))
router.post('/user/update/:cpf', routerAdapter(new UpdateUserController()))
router.post('/user', routerAdapter(new AddUserController()));
// OUTSOURCE ROUTES ------------------------------------------------------------------------------------------------------------
router.get('/outsource', routerAdapter(new findAllOutsourcesController()))
router.get('/outsource/cpf/:cpf', routerAdapter(new findOutsourceByCpfController()))
router.get('/outsource/:id', routerAdapter(new findOutsourceByIdController()))

router.post('/outsource/update/:cpf', routerAdapter(new UpdateOutsourceController()))
// CLAIMS ROUTES ------------------------------------------------------------------------------------------------------------
router.get('/claims', routerAdapter(new findAllClaimsController()))
router.get('/claims/:id', routerAdapter(new findClaimByIdController))
router.get('/user/:cpf/claims', routerAdapter(new findUserClaimsController()))
router.get('/outsource/:cpf/claims', routerAdapter(new findOutSourceClaimsController()))

router.post('/user/:cpf/newclaim/outsource',routerAdapter(new addClaimWithOutsourceController()))
router.post('/user/:cpf/newclaim/', routerAdapter(new addClaimNoOutsourceController()))

export default router
import { InsertResult } from "typeorm";
import { IOutsource } from "../outsource/IOutsource";
import { IUser } from "../user/IUser";
import { IClaims } from "./IClaims";

export interface IClaimsRepository{

    findAll: () => Promise<[IClaims[], number]>
    findClaimsFromUser: (cpf:IUser["cpf"]) => Promise<[IClaims[], number]>
    findClaimsFromOutsource: (cpf:IOutsource["cpf"]) => Promise<[IClaims[], number]>
    findById: (id: IClaims["id"]) => Promise<IClaims>
    findByType: (type: IClaims["type"]) => Promise<[IClaims[], number]>

    saveClaim: (data: IClaims) => Promise<InsertResult>

}

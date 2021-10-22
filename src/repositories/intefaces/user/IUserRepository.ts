import { InsertResult, UpdateResult } from "typeorm";
import { user } from "../../entities/User";
import { IUser } from "./IUser";
export interface IUserRepository {

    findAll: () => Promise<[IUser[], number]>
    findById: (id: IUser["id"]) => Promise<IUser>
    findByName: (name: IUser["name"]) => Promise<IUser[]>
    findByCpf:(cpf: IUser["cpf"]) => Promise<IUser>
    saveUser: (userData: IUser) => Promise<InsertResult>
    addOneClaim: (id: number, claims: number) => Promise<UpdateResult>
}
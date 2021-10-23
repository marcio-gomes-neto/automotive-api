import { InsertResult, UpdateResult } from "typeorm";
import { IUser } from "./IUser";
import { IUserUpdate } from "./IUserUpdate";
export interface IUserRepository {

    findAll: () => Promise<[IUser[], number]>
    findById: (id: IUser["id"]) => Promise<IUser>
    findByName: (name: IUser["name"]) => Promise<[IUser[], number]>
    findByCity:(city: IUser["city"] ) =>Promise<[IUser[], number]>
    findByGender:(gender: IUser["gender"] ) =>Promise<[IUser[], number]>
    findByCpf:(cpf: IUser["cpf"]) => Promise<IUser>

    updateUser:(cpf:IUser["cpf"], userData:IUserUpdate ) => Promise<UpdateResult>

    saveUser: (userData: IUser) => Promise<InsertResult>
    addOneClaim: (id: number, claims: number) => Promise<UpdateResult>

    disableUser: (cpf: IUser["cpf"]) => Promise<UpdateResult>
}
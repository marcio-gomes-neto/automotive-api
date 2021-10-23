import { IOutsource } from "./IOutsource";
import { IOutsourceUpdate } from "./IOutsourceUpdate";
import { InsertResult, UpdateResult } from "typeorm";

export interface IOutsourceRepository{
    findAll: () => Promise<[IOutsource[], number]>
    findById: (id: IOutsource["id"]) => Promise<IOutsource>
    findByName: (name: IOutsource["name"]) => Promise<[IOutsource[], number]>
    findByCpf:(cpf: IOutsource["cpf"]) => Promise<IOutsource>

    updateOutsource:(cpf:IOutsource["cpf"], userData:IOutsourceUpdate ) => Promise<UpdateResult>

    saveOutsource: (userData: IOutsource) => Promise<InsertResult>
}
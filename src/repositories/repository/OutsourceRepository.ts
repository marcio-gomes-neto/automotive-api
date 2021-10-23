import { EntityRepository, Repository, createConnection } from "typeorm";
import { outsource } from "../entities/Outsource";
import { IOutsource } from "../intefaces/outsource/IOutsource";
import { IOutsourceRepository } from "../intefaces/outsource/IOutsourceRepository";
import { IOutsourceUpdate } from "../intefaces/outsource/IOutsourceUpdate";


@EntityRepository(outsource)
export class OutsourceRepository extends Repository<outsource> implements IOutsourceRepository{
    // findAll: () => Promise<[IOutsource[], number]>
    // findById: (id: IOutsource["id"]) => Promise<IOutsource>
    // findByName: (name: IOutsource["name"]) => Promise<[IOutsource[], number]>
    // findByCpf:(cpf: IOutsource["cpf"]) => Promise<IOutsource>

    // updateOutsource:(cpf:IOutsource["cpf"], userData:IOutsourceUpdate ) => Promise<UpdateResult>

    // saveOutsource: (userData: IOutsource) => Promise<InsertResult>
    findAll(){
        return this.createQueryBuilder("outsource")
          .where("outsource.user = :bool",{ bool: false })
          .getManyAndCount();
      }
     
    findById(id: number){
        return this.createQueryBuilder("outsource")
        .where("outsource.id = :id", { id: id })
        .getOne();
    }  

    findByName(name: string) {
        return this.createQueryBuilder("outsource")
          .where("outsource.name = :name", { name: name })
          .getManyAndCount();
    }

    findByCpf(cpf: string){
        return this.createQueryBuilder("outsource")
        .where("outsource.cpf = :cpf", { cpf: cpf })
        .getOne();
    }

    saveOutsource(data: IOutsource){
        return this.createQueryBuilder("outsource")
        .insert()
        .into(outsource)
        .values(data)
        .execute();
      }

    updateOutsource(cpf:string , data:IOutsourceUpdate){
        return this.createQueryBuilder("outsource")
        .update()
        .set({ ...data })
        .where("cpf = :cpf", { cpf: cpf })
        .execute();
    }  

    addOneClaim(cpf: number){
        return this.createQueryBuilder("outsource")
        .update()
        .set({ claims: () => "claims + 1" })
        .where("cpf = :cpf", { cpf: cpf })
        .execute();
      }


}
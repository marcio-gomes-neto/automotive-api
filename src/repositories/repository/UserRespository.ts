import { EntityRepository, Repository, createConnection } from "typeorm";
import { IUser } from "../intefaces/user/IUser";
import { user } from "../entities/User";
import { IUserRepository } from "../intefaces/user/IUserRepository";
import { IUserUpdate } from "../intefaces/user/IUserUpdate";

@EntityRepository(user)
export class UserRepository extends Repository<user> implements IUserRepository{

    findAll(){
      return this.createQueryBuilder("user")
        .where("user.active = :bool",{ bool: true })
        .getManyAndCount();
    }

    findById(id: number){
      return this.createQueryBuilder("user")
      .where("user.id = :id", { id: id })
      .getOne();
    }

    findByName(name: string) {
    return this.createQueryBuilder("user")
      .where("user.name = :name", { name: name })
      .getManyAndCount();
    }

    findByGender(gender: string) {
      return this.createQueryBuilder("user")
        .where("user.gender = :gender", { gender: gender })
        .getManyAndCount();
    }

    findByCity(City: string) {
      return this.createQueryBuilder("user")
        .where("user.city = :city", { city: City })
        .getManyAndCount();
      }

    findByCpf(cpf: string){
      return this.createQueryBuilder("user")
      .where("user.cpf = :cpf", { cpf: cpf })
      .getOne();
    }

    saveUser(data: IUser){
      return this.createQueryBuilder("user")
      .insert()
      .into(user)
      .values(data)
      .execute();
    }

    updateUser(cpf:string ,data:IUserUpdate){
      return this.createQueryBuilder("user")
      .update()
      .set({ ...data })
      .where("cpf = :cpf", { cpf: cpf })
      .execute();
    }

    addOneClaim(cpf: number){
      return this.createQueryBuilder("user")
      .update()
      .set({ claims: () => "claims + 1" })
      .where("cpf = :cpf", { cpf: cpf })
      .execute();
    }

    disableUser(cpf:string){
      return this.createQueryBuilder("user")
        .update()
        .set({active: false})
        .where("cpf = :cpf", { cpf: cpf })
        .execute()
    }
}